import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateDispatchDto, companyId: number): Promise<DispatchOrder> {
    const warehouse = await this.warehousesService.findByName(dto.warehouse_name, companyId);

    // Resolve every item code to its entity up front so we fail fast (before
    // opening a transaction) if the dispatch references an unknown item.
    const resolvedItems = await Promise.all(
      dto.items.map(async (item) => ({
        item: await this.itemsService.findByCode(item.item_code, companyId),
        dispatched_qty: item.dispatched_qty,
      })),
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 1) Validate availability for every line before touching stock, so a
      // partially-fulfillable dispatch never leaves stock half-decremented.
      for (const { item, dispatched_qty } of resolvedItems) {
        await this.inventoryService.checkAvailability(
          item.id,
          warehouse.id,
          dispatched_qty,
          companyId,
          queryRunner,
        );
      }

      const dispatch = queryRunner.manager.create(DispatchOrder, {
        ...dto,
        company_id: companyId,
        dispatch_date: new Date(dto.dispatch_date),
      });
      const savedDispatch = await queryRunner.manager.save(DispatchOrder, dispatch);

      // 2) Decrease stock for each item, with a ledger entry pointing back
      // at this dispatch order.
      for (const { item, dispatched_qty } of resolvedItems) {
        await this.inventoryService.decreaseStock(item.id, warehouse.id, dispatched_qty, companyId, {
          reference_type: 'dispatch',
          reference_id: savedDispatch.id,
          remarks: `Dispatch ${savedDispatch.dispatch_number}`,
          queryRunner,
        });
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
    return this.repo.find({ where: { company_id: companyId }, order: { dispatch_date: 'DESC' } });
  }

  async findOne(id: number, companyId: number): Promise<DispatchOrder> {
    const order = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!order) throw new NotFoundException(`Dispatch order #${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateDispatchDto, companyId: number): Promise<DispatchOrder> {
    // Note: A real-world update is complex. It might need to reverse old stock
    // changes before applying new ones, especially if quantities change.
    // Phase 1 scope: header-only update, no stock re-adjustment.
    const existing = await this.findOne(id, companyId);
    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(id: number, companyId: number): Promise<void> {
    // Note: A real-world delete should reverse the stock subtractions (i.e., add the stock back).
    // Phase 1 scope: not implemented — flagged as a Phase 2 follow-up.
    const res = await this.repo.delete({ id, company_id: companyId });
    if (res.affected === 0)
      throw new NotFoundException(`Dispatch order #${id} not found`);
  }

  count(companyId: number): Promise<number> {
    return this.repo.count({ where: { company_id: companyId } });
  }
}
