import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ProductionOrder } from './production-order.entity';
import { ProductionOrderItem } from './production-order-item.entity';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { UpdateProductionOrderDto } from './dto/update-production-order.dto';
import { CompleteProductionOrderDto } from './dto/complete-production-order.dto';
import { InventoryService } from '../inventory/inventory.service'; // <-- नया इम्पोर्ट जोड़ा गया

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(ProductionOrder)
    private poRepo: Repository<ProductionOrder>,
    @InjectRepository(ProductionOrderItem)
    private poItemRepo: Repository<ProductionOrderItem>,
    private dataSource: DataSource,
    private inventoryService: InventoryService, // <-- InventoryService को यहाँ जोड़ा गया
  ) {}

  private generateOrderNumber(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const rnd = Math.floor(1000 + Math.random() * 9000);
    return `PROD-${y}${m}${day}-${rnd}`;
  }

  async create(dto: CreateProductionOrderDto, companyId: number) {
    const po = this.poRepo.create({
      company_id: companyId,
      order_number: this.generateOrderNumber(),
      fg_item_id: dto.fg_item_id,
      quantity: dto.quantity,
      warehouse_id: dto.warehouse_id,
      remarks: dto.remarks || null,
      status: 'planned',
      items: dto.items.map((it) =>
        this.poItemRepo.create({
          item_id: it.item_id,
          required_qty: it.required_qty,
          issued_qty: 0,
          remarks: it.remarks || null,
        }),
      ),
    });

    return this.poRepo.save(po);
  }

  async findAll(companyId: number) {
    return this.poRepo.find({
      where: { company_id: companyId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number, companyId: number) {
    const po = await this.poRepo.findOne({
      where: { id, company_id: companyId },
    });
    if (!po) throw new NotFoundException('Production order not found');
    return po;
  }

  async update(id: number, dto: UpdateProductionOrderDto, companyId: number) {
    const po = await this.findOne(id, companyId);
    if (po.status === 'completed' || po.status === 'in_progress') {
      throw new BadRequestException(
        'Cannot update an order in progress or completed',
      );
    }

    po.fg_item_id = dto.fg_item_id ?? po.fg_item_id;
    po.quantity = dto.quantity ?? po.quantity;
    po.warehouse_id = dto.warehouse_id ?? po.warehouse_id;
    po.remarks = dto.remarks ?? po.remarks;

    if (dto.items) {
      await this.poItemRepo.delete({ production_order_id: id });
      po.items = dto.items.map((it) =>
        this.poItemRepo.create({
          production_order_id: id,
          item_id: it.item_id,
          required_qty: it.required_qty,
          issued_qty: 0,
          remarks: it.remarks || null,
        }),
      );
    }

    return this.poRepo.save(po);
  }

  async start(id: number, companyId: number) {
    const po = await this.findOne(id, companyId);
    if (po.status !== 'planned' && po.status !== 'draft') {
      throw new BadRequestException('Only planned orders can be started');
    }
    po.status = 'in_progress';
    return this.poRepo.save(po);
  }

  async cancel(id: number, companyId: number) {
    const po = await this.findOne(id, companyId);
    if (po.status === 'completed') {
      throw new BadRequestException('Cannot cancel completed order');
    }
    po.status = 'cancelled';
    return this.poRepo.save(po);
  }

  /**
   * Delete a production order. Blocked once stock has actually moved
   * (in_progress/completed both imply InventoryService ledger entries already
   * exist for this order), mirroring the same guard used by update().
   */
  async remove(id: number, companyId: number): Promise<void> {
    const po = await this.findOne(id, companyId);
    if (po.status === 'in_progress' || po.status === 'completed') {
      throw new BadRequestException(
        'Cannot delete an order that is in progress or completed',
      );
    }
    await this.poItemRepo.delete({ production_order_id: id });
    await this.poRepo.delete({ id, company_id: companyId });
  }

  /**
   * Complete the production order by calling InventoryService
   * to atomically update stock and create ledger entries.
   */
  async complete(
    id: number,
    dto: CompleteProductionOrderDto,
    companyId: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const po = await queryRunner.manager.findOne(ProductionOrder, {
        where: { id, company_id: companyId },
      });
      if (!po) throw new NotFoundException('Production order not found');
      if (po.status === 'completed')
        throw new BadRequestException('Already completed');

      const items = await queryRunner.manager.find(ProductionOrderItem, {
        where: { production_order_id: id },
      });

      // 1) Validate availability for each raw material
      for (const item of items) {
        await this.inventoryService.checkAvailability(
          item.item_id,
          po.warehouse_id,
          Number(item.required_qty),
          companyId,
          queryRunner,
        );
      }

      // 2) Decrease raw materials (issue to production) & update issued_qty
      for (const item of items) {
        await this.inventoryService.decreaseStock(
          item.item_id,
          po.warehouse_id,
          Number(item.required_qty),
          companyId,
          {
            reference_type: 'production_issue',
            reference_id: id,
            remarks: `Issued to production ${po.order_number}`,
            queryRunner,
          },
        );

        item.issued_qty = Number(item.required_qty);
        await queryRunner.manager.save(item);
      }

      // 3) Increase FG stock
      const targetWarehouse = dto.warehouse_id ?? po.warehouse_id;
      await this.inventoryService.increaseStock(
        po.fg_item_id,
        targetWarehouse,
        Number(dto.produced_qty),
        companyId,
        {
          reference_type: 'production_fg_receipt',
          reference_id: id,
          remarks: `FG produced for ${po.order_number}`,
          queryRunner,
        },
      );

      // 4) Mark PO completed
      po.status = 'completed';
      await queryRunner.manager.save(po);

      await queryRunner.commitTransaction();

      // return fresh PO
      return this.findOne(id, companyId);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
