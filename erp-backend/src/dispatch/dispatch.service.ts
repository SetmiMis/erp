import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DispatchOrder } from './dispatch.entity';
import { CreateDispatchDto } from './dto/create-dispatch.dto';
import { UpdateDispatchDto } from './dto/update-dispatch.dto';
import { ItemsService } from '../items/items.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(DispatchOrder)
    private repo: Repository<DispatchOrder>,
    private itemsService: ItemsService,
    private warehousesService: WarehousesService,
    private inventoryService: InventoryService,
    private dataSource: DataSource,
  ) {}

  async create(
    dto: CreateDispatchDto,
    companyId: number,
  ): Promise<DispatchOrder> {
    const warehouse = await this.warehousesService.findByName(
      dto.warehouse_name,
      companyId,
    );

    // Resolve every item code to its entity up front so we fail fast (before
    // opening a transaction) if the dispatch references an unknown item.
    const resolvedItems = await Promise.all(
      dto.items.map(async (item) => ({
        item: await this.itemsService.findByCode(item.item_code, companyId),
        dispatched_qty: item.dispatched_qty,
        batch_no: item.batch_no,
      })),
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 1) Validate availability for every line before touching stock, so a
      // partially-fulfillable dispatch never leaves stock half-decremented.
      // PLAN.md step 1.6: a batch-tracked line with no batch_no is a FEFO
      // dispatch that can draw from more than one batch, so it's checked
      // against the item's total across all batches rather than one row.
      for (const { item, dispatched_qty, batch_no } of resolvedItems) {
        if (item.batch_tracked && !batch_no) {
          await this.inventoryService.checkAvailabilityAcrossBatches(
            item.id,
            warehouse.id,
            dispatched_qty,
            companyId,
            queryRunner,
          );
        } else {
          await this.inventoryService.checkAvailability(
            item.id,
            warehouse.id,
            dispatched_qty,
            companyId,
            queryRunner,
            batch_no,
          );
        }
      }

      const dispatch = queryRunner.manager.create(DispatchOrder, {
        ...dto,
        company_id: companyId,
        dispatch_date: new Date(dto.dispatch_date),
      });
      const savedDispatch = await queryRunner.manager.save(
        DispatchOrder,
        dispatch,
      );

      // 2) Decrease stock for each item, with a ledger entry pointing back
      // at this dispatch order.
      for (const { item, dispatched_qty, batch_no } of resolvedItems) {
        if (item.batch_tracked && !batch_no) {
          await this.inventoryService.decreaseStockFefo(
            item.id,
            warehouse.id,
            dispatched_qty,
            companyId,
            {
              reference_type: 'dispatch',
              reference_id: savedDispatch.id,
              remarks: `Dispatch ${savedDispatch.dispatch_number}`,
              queryRunner,
            },
          );
        } else {
          await this.inventoryService.decreaseStock(
            item.id,
            warehouse.id,
            dispatched_qty,
            companyId,
            {
              reference_type: 'dispatch',
              reference_id: savedDispatch.id,
              remarks: `Dispatch ${savedDispatch.dispatch_number}`,
              queryRunner,
              batch_no,
            },
          );
        }
      }

      await queryRunner.commitTransaction();
      return savedDispatch;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(companyId: number): Promise<DispatchOrder[]> {
    return this.repo.find({
      where: { company_id: companyId },
      order: { dispatch_date: 'DESC' },
    });
  }

  async findOne(id: number, companyId: number): Promise<DispatchOrder> {
    const order = await this.repo.findOne({
      where: { id, company_id: companyId },
    });
    if (!order) throw new NotFoundException(`Dispatch order #${id} not found`);
    return order;
  }

  async update(
    id: number,
    dto: UpdateDispatchDto,
    companyId: number,
  ): Promise<DispatchOrder> {
    // If the lines or the warehouse are changing, the stock this dispatch
    // already moved has to be reversed and re-applied — otherwise editing a
    // dispatch's quantities silently leaves the old (wrong) stock movement in
    // place alongside whatever the new quantities imply. Header-only edits
    // (customer name, remarks, status, etc.) skip all of this and never touch
    // stock, same as before.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existing = await queryRunner.manager.findOne(DispatchOrder, {
        where: { id, company_id: companyId },
      });
      if (!existing)
        throw new NotFoundException(`Dispatch order #${id} not found`);

      const stockFieldsChanging =
        dto.items !== undefined || dto.warehouse_name !== undefined;

      if (stockFieldsChanging) {
        // Reverse what this dispatch originally moved. The returned
        // movements are also the fallback for "what warehouse/items" when
        // this update only changes one of the two (e.g. renaming the
        // warehouse without resending the line items).
        const originalMovements = await this.inventoryService.reverseMovements(
          companyId,
          'dispatch',
          id,
          queryRunner,
        );

        const warehouse = dto.warehouse_name
          ? await this.warehousesService.findByName(
              dto.warehouse_name,
              companyId,
            )
          : null;
        const warehouseId = warehouse?.id ?? originalMovements[0]?.warehouse_id;
        if (!warehouseId) {
          throw new BadRequestException(
            'Cannot determine warehouse for this dispatch update',
          );
        }

        // PLAN.md step 1.6: when new line items are given, a batch-tracked
        // one with no batch_no re-runs FEFO from scratch (the reversal
        // above already put its old batches' stock back, so this picks
        // fresh); the "only the warehouse changed" fallback instead replays
        // each original movement against its own recorded batch_no exactly
        // (no FEFO re-selection -- it's not a new consumption decision).
        const newLines = dto.items
          ? await Promise.all(
              dto.items.map(async (line) => {
                const item = await this.itemsService.findByCode(
                  line.item_code,
                  companyId,
                );
                return {
                  itemId: item.id,
                  qty: line.dispatched_qty,
                  batch_no: line.batch_no,
                  fefo: item.batch_tracked && !line.batch_no,
                };
              }),
            )
          : originalMovements.map((m) => ({
              itemId: m.item_id,
              qty: Number(m.qty_out),
              batch_no: m.batch_no ?? undefined,
              fefo: false,
            }));

        // Validate every line before touching stock, same reasoning as create().
        for (const line of newLines) {
          if (line.fefo) {
            await this.inventoryService.checkAvailabilityAcrossBatches(
              line.itemId,
              warehouseId,
              line.qty,
              companyId,
              queryRunner,
            );
          } else {
            await this.inventoryService.checkAvailability(
              line.itemId,
              warehouseId,
              line.qty,
              companyId,
              queryRunner,
              line.batch_no,
            );
          }
        }
        for (const line of newLines) {
          const mutationOpts = {
            reference_type: 'dispatch',
            reference_id: id,
            remarks: `Dispatch ${existing.dispatch_number} (updated)`,
            queryRunner,
          };
          if (line.fefo) {
            await this.inventoryService.decreaseStockFefo(
              line.itemId,
              warehouseId,
              line.qty,
              companyId,
              mutationOpts,
            );
          } else {
            await this.inventoryService.decreaseStock(
              line.itemId,
              warehouseId,
              line.qty,
              companyId,
              { ...mutationOpts, batch_no: line.batch_no },
            );
          }
        }
      }

      const headerDto = { ...dto };
      delete headerDto.items;
      const merged = queryRunner.manager.merge(DispatchOrder, existing, {
        ...headerDto,
        ...(headerDto.dispatch_date
          ? { dispatch_date: new Date(headerDto.dispatch_date) }
          : {}),
      });
      const saved = await queryRunner.manager.save(DispatchOrder, merged);

      await queryRunner.commitTransaction();
      return saved;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number, companyId: number): Promise<void> {
    // Reverses the stock decrease this dispatch caused, then deletes the
    // header — both in one transaction so a failed reversal never leaves the
    // order deleted with stock still short.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existing = await queryRunner.manager.findOne(DispatchOrder, {
        where: { id, company_id: companyId },
      });
      if (!existing)
        throw new NotFoundException(`Dispatch order #${id} not found`);

      await this.inventoryService.reverseMovements(
        companyId,
        'dispatch',
        id,
        queryRunner,
      );
      await queryRunner.manager.delete(DispatchOrder, {
        id,
        company_id: companyId,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  count(companyId: number): Promise<number> {
    return this.repo.count({ where: { company_id: companyId } });
  }
}
