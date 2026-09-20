// erp-backend/src/purchase-orders/purchase-orders.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DataSource } from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { Supplier } from '../suppliers/supplier.entity';
import { Item } from '../items/item.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { Warehouse } from '../warehouses/warehouse.entity';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private repo: Repository<PurchaseOrder>,
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    @InjectRepository(Warehouse)
    private warehouseRepo: Repository<Warehouse>,
    private dataSource: DataSource, // Injected for transactions
  ) {}

  // Centralized function to calculate totals for a list of items
  private calculateTotals(items: Partial<PurchaseOrderItem>[]) {
    let grandTotal = 0;
    for (const item of items) {
      // ✅ FIX: Provide fallback values to prevent 'undefined' error.
      const lineAmount = (item.ordered_qty || 0) * (item.unit_price || 0);
      const discountAmount = (lineAmount * (item.discount_percent || 0)) / 100;
      const taxableAmount = lineAmount - discountAmount;
      const taxAmount = (taxableAmount * (item.tax_percent || 0)) / 100;
      item.total_amount = taxableAmount + taxAmount;
      grandTotal += item.total_amount;
    }
    return { items, grandTotal };
  }

  async create(dto: CreatePurchaseOrderDto, companyId: number): Promise<PurchaseOrder> {
    // Validate related entities — scoped by company so a PO can't be raised
    // against another company's supplier/warehouse/item by guessing an id
    // (see Multi-Company Architecture Audit §11 cross-reference integrity).
    const supplier = await this.supplierRepo.findOneBy({ id: dto.supplier_id, company_id: companyId });
    if (!supplier) {
      throw new NotFoundException(
        `Supplier with ID ${dto.supplier_id} not found`,
      );
    }
    const warehouse = await this.warehouseRepo.findOneBy({
      id: dto.warehouse_id,
      company_id: companyId,
    });
    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with ID ${dto.warehouse_id} not found`,
      );
    }

    // Auto-generate PO number if not provided
    if (!dto.po_number) {
      const lastPO = await this.repo.findOne({
        where: { company_id: companyId },
        order: { id: 'DESC' },
      });
      const nextId = (lastPO?.id || 0) + 1;
      dto.po_number = `PO-${String(nextId).padStart(4, '0')}`;
    }

    const po = new PurchaseOrder();
    Object.assign(po, dto); // Assign header details
    po.company_id = companyId;
    po.supplier = supplier;
    po.warehouse = warehouse;

    // Process items
    const poItems: PurchaseOrderItem[] = [];
    for (const itemDto of dto.items) {
      const item = await this.itemRepo.findOneBy({ id: itemDto.item_id, company_id: companyId });
      if (!item) {
        throw new NotFoundException(
          `Item with ID ${itemDto.item_id} not found`,
        );
      }
      const poItem = new PurchaseOrderItem();
      Object.assign(poItem, itemDto);
      poItem.item = item;
      poItems.push(poItem);
    }

    // Calculate totals and assign to entities
    const { grandTotal } = this.calculateTotals(poItems);
    po.items = poItems;
    po.total_amount = grandTotal;

    return this.repo.save(po);
  }

  async update(
    id: number,
    dto: UpdatePurchaseOrderDto,
    companyId: number,
  ): Promise<PurchaseOrder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const poToUpdate = await queryRunner.manager.findOne(PurchaseOrder, {
        where: { id, company_id: companyId },
        relations: ['items'],
      });

      if (!poToUpdate) {
        throw new NotFoundException(`Purchase Order with ID ${id} not found`);
      }
      if (poToUpdate.status !== 'draft') {
        throw new BadRequestException('Only draft orders can be edited.');
      }

      // Update header-level properties from DTO
      queryRunner.manager.merge(PurchaseOrder, poToUpdate, dto);

      if (dto.supplier_id) {
        const supplier = await this.supplierRepo.findOneBy({
          id: dto.supplier_id,
          company_id: companyId,
        });
        if (!supplier)
          throw new NotFoundException(
            `Supplier with ID ${dto.supplier_id} not found`,
          );
        poToUpdate.supplier = supplier;
      }
      if (dto.warehouse_id) {
        const warehouse = await this.warehouseRepo.findOneBy({
          id: dto.warehouse_id,
          company_id: companyId,
        });
        if (!warehouse)
          throw new NotFoundException(
            `Warehouse with ID ${dto.warehouse_id} not found`,
          );
        poToUpdate.warehouse = warehouse;
      }

      if (dto.items) {
        // ✅ FIX: Create a non-nullable const to help TypeScript's type inference.
        const dtoItems = dto.items;

        // Delete items that are no longer in the DTO
        const itemsToRemove = poToUpdate.items.filter(
          (existingItem) =>
            !dtoItems.some(
              (dtoItem) => dtoItem.item_id === existingItem.item.id,
            ),
        );
        if (itemsToRemove.length > 0) {
          await queryRunner.manager.remove(itemsToRemove);
        }

        // Add or Update items
        const updatedItems: PurchaseOrderItem[] = [];
        for (const itemDto of dtoItems) {
          const itemEntity = await this.itemRepo.findOneBy({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            id: (itemDto as any).item_id,
            company_id: companyId,
          });
          if (!itemEntity)
            throw new NotFoundException(
              `Item with ID ${itemDto.item_id} not found`,
            );

          let poItem = poToUpdate.items.find(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (pi) => pi.item.id === (itemDto as any).item_id,
          );
          if (poItem) {
            // Update existing item
            Object.assign(poItem, itemDto);
          } else {
            // Create new item
            poItem = new PurchaseOrderItem();
            Object.assign(poItem, itemDto);
            poItem.item = itemEntity;
            poItem.purchaseOrder = poToUpdate;
          }
          updatedItems.push(poItem);
        }
        poToUpdate.items = updatedItems;
      }

      const { grandTotal } = this.calculateTotals(poToUpdate.items);
      poToUpdate.total_amount = grandTotal;

      const updatedPo = await queryRunner.manager.save(poToUpdate);
      await queryRunner.commitTransaction();
      return updatedPo;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private transformPoForClient(po: PurchaseOrder): any {
    return {
      id: po.id,
      po_number: po.po_number,
      order_date: po.order_date,
      expected_date: po.expected_date,
      status: po.status,
      total_amount: po.total_amount,
      supplier_name: po.supplier?.name || 'N/A',
      warehouse_name: po.warehouse?.name || 'N/A',
      supplier_id: po.supplier?.id,
      warehouse_id: po.warehouse?.id,
      terms_and_conditions: po.terms_and_conditions,
      remarks: po.remarks,
      items: po.items?.map((item) => ({
        id: item.id,
        item_id: item.item?.id,
        item_name: item.item?.name || 'N/A',
        item_code: item.item?.sku || 'N/A',
        ordered_qty: item.ordered_qty,
        unit_price: item.unit_price,
        uom: item.uom,
        discount_percent: item.discount_percent,
        tax_percent: item.tax_percent,
        total_amount: item.total_amount,
      })),
      created_at: po.created_at,
      updated_at: po.updated_at,
    };
  }

  async findAll(
    query: { status?: string; supplier?: string },
    companyId: number,
  ): Promise<any[]> {
    const options: FindManyOptions<PurchaseOrder> = {
      order: { order_date: 'DESC', id: 'DESC' },
      relations: ['supplier', 'warehouse', 'items', 'items.item'],
      where: { company_id: companyId },
    };
    if (query.status) {
      options.where = { ...options.where, status: query.status };
    }
    if (query.supplier) {
      options.where = {
        ...options.where,
        supplier: { id: parseInt(query.supplier, 10) },
      };
    }
    const purchaseOrders = await this.repo.find(options);
    return purchaseOrders.map((po) => this.transformPoForClient(po));
  }

  async findOne(id: number, companyId: number): Promise<any> {
    const po = await this.repo.findOne({
      where: { id, company_id: companyId },
      relations: ['supplier', 'warehouse', 'items', 'items.item'],
    });
    if (!po) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
    return this.transformPoForClient(po);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const po = await this.repo.findOneBy({ id, company_id: companyId });
    if (!po) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
    if (po.status !== 'draft') {
      throw new BadRequestException('Only draft orders can be deleted.');
    }
    const result = await this.repo.delete({ id, company_id: companyId });
    if (result.affected === 0) {
      throw new NotFoundException(`Purchase Order with ID ${id} not found`);
    }
  }

  // --- Dashboard Helper Methods ---
  async count(companyId: number): Promise<number> {
    return this.repo.count({ where: { company_id: companyId } });
  }

  async getStatusCounts(companyId: number): Promise<Record<string, number>> {
    const rows = await this.repo
      .createQueryBuilder('po')
      .where('po.company_id = :companyId', { companyId })
      .select('po.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('po.status')
      .getRawMany();

    return rows.reduce((acc: Record<string, number>, r: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      acc[r.status] = Number(r.count);
      return acc;
    }, {});
  }

  async getRecent(companyId: number, limit = 5): Promise<any[]> {
    const recentPOs = await this.repo.find({
      where: { company_id: companyId },
      relations: ['supplier', 'warehouse'],
      order: { created_at: 'DESC' },
      take: limit,
    });
    return recentPOs.map(this.transformPoForClient);
  }
}
