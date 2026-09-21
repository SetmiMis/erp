import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Grn } from './entities/grn.entity';
import { GrnItem } from './entities/grn-item.entity';
import { CreateGrnDto } from './dto/create-grn.dto';
import { UpdateGrnDto } from './dto/update-grn.dto';
import { Item } from '../items/item.entity';
import { Warehouse } from '../warehouses/warehouse.entity';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class GrnService {
  constructor(
    @InjectRepository(Grn) private readonly grnRepo: Repository<Grn>,
    @InjectRepository(GrnItem)
    private readonly grnItemRepo: Repository<GrnItem>,
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepo: Repository<Warehouse>,
    private readonly dataSource: DataSource,
    private readonly inventoryService: InventoryService,
  ) {}

  private async generateGrnNumber(companyId: number): Promise<string> {
    const last = await this.grnRepo.findOne({
      where: { company_id: companyId },
      order: { id: 'DESC' },
    });
    const next = last ? last.id + 1 : 1;
    return `GRN-${String(next).padStart(6, '0')}`;
  }

  async create(dto: CreateGrnDto, companyId: number): Promise<Grn> {
    const warehouse = await this.warehouseRepo.findOne({
      where: { id: dto.warehouse_id, company_id: companyId },
    });
    if (!warehouse) throw new NotFoundException('Warehouse not found.');

    // Validate items exist and belong to this company (cross-reference
    // integrity, see Multi-Company Architecture Audit §11).
    const itemIds = dto.items.map((i) => i.item_id);
    const items = await this.itemRepo.find({
      where: { id: In(itemIds), company_id: companyId },
    });
    if (items.length !== itemIds.length)
      throw new BadRequestException('One or more items not found.');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const grnNumber = await this.generateGrnNumber(companyId);
      const grn = this.grnRepo.create({
        company_id: companyId,
        grn_number: grnNumber,
        grn_date: dto.grn_date,
        warehouse,
        supplier_ref: dto.supplier_ref,
        status: 'pending',
      });

      const savedGrn = await queryRunner.manager.save(Grn, grn);

      const grnItems: GrnItem[] = dto.items.map((i) => {
        const item = items.find((it) => it.id === i.item_id);
        return this.grnItemRepo.create({
          grn: savedGrn,
          item,
          received_qty: i.received_qty,
          remarks: i.remarks,
        });
      });

      await queryRunner.manager.save(GrnItem, grnItems);

      // Goods received -> increase warehouse stock for each line, with a
      // ledger entry pointing back at this GRN.
      for (const grnItem of grnItems) {
        await this.inventoryService.increaseStock(
          grnItem.item.id,
          warehouse.id,
          grnItem.received_qty,
          companyId,
          {
            reference_type: 'grn_receipt',
            reference_id: savedGrn.id,
            remarks: `GRN ${grnNumber}`,
            queryRunner,
          },
        );
      }

      await queryRunner.commitTransaction();

      return this.grnRepo.findOne({
        where: { id: savedGrn.id },
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    params: { status?: string; search?: string } | undefined,
    companyId: number,
  ): Promise<Grn[]> {
    const qb = this.grnRepo
      .createQueryBuilder('grn')
      .leftJoinAndSelect('grn.items', 'items')
      .leftJoinAndSelect('grn.warehouse', 'warehouse')
      .where('grn.company_id = :companyId', { companyId });
    if (params?.status)
      qb.andWhere('grn.status = :status', { status: params.status });
    if (params?.search)
      qb.andWhere('(grn.grn_number ILIKE :q OR warehouse.name ILIKE :q)', {
        q: `%${params.search}%`,
      });
    qb.orderBy('grn.grn_date', 'DESC');
    return qb.getMany();
  }

  async findOne(id: number, companyId: number): Promise<Grn> {
    const grn = await this.grnRepo.findOne({
      where: { id, company_id: companyId },
    });
    if (!grn) throw new NotFoundException('GRN not found.');
    return grn;
  }

  async update(id: number, dto: UpdateGrnDto, companyId: number): Promise<Grn> {
    const grn = await this.grnRepo.findOne({
      where: { id, company_id: companyId },
    });
    if (!grn) throw new NotFoundException('GRN not found.');

    if (dto.warehouse_id) {
      const warehouse = await this.warehouseRepo.findOne({
        where: { id: dto.warehouse_id, company_id: companyId },
      });
      if (!warehouse) throw new NotFoundException('Warehouse not found.');
      grn.warehouse = warehouse;
    }

    if (dto.grn_date) grn.grn_date = dto.grn_date;
    if (dto.supplier_ref !== undefined) grn.supplier_ref = dto.supplier_ref;
    if (dto.status) grn.status = dto.status;

    return this.grnRepo.save(grn);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const res = await this.grnRepo.delete({ id, company_id: companyId });
    if (!res.affected) throw new NotFoundException('GRN not found.');
  }

  async count(companyId: number): Promise<number> {
    return this.grnRepo.count({ where: { company_id: companyId } });
  }
}
