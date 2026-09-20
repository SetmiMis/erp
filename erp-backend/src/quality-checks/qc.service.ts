import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { QualityCheck } from './entities/quality-check.entity';
import { QCItem } from './entities/qc-item.entity';
import { CreateQualityCheckDto } from './dto/create-qc.dto';
import { Grn } from '../grn/entities/grn.entity';
import { GrnItem } from '../grn/entities/grn-item.entity';
import { Item } from '../items/item.entity';

@Injectable()
export class QualityCheckService {
  constructor(
    @InjectRepository(QualityCheck)
    private readonly qcRepo: Repository<QualityCheck>,
    @InjectRepository(QCItem) private readonly qcItemRepo: Repository<QCItem>,
    @InjectRepository(Grn) private readonly grnRepo: Repository<Grn>,
    @InjectRepository(GrnItem)
    private readonly grnItemRepo: Repository<GrnItem>,
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
    private readonly dataSource: DataSource,
  ) {}

  private async generateQcNumber(companyId: number): Promise<string> {
    const last = await this.qcRepo.findOne({
      where: { company_id: companyId },
      order: { id: 'DESC' },
    });
    const next = last ? last.id + 1 : 1;
    return `QC-${String(next).padStart(6, '0')}`;
  }

  async create(dto: CreateQualityCheckDto, companyId: number): Promise<QualityCheck> {
    const grn = await this.grnRepo.findOne({
      where: { id: dto.grn_id, company_id: companyId },
      relations: ['items'],
    });
    if (!grn) throw new NotFoundException('GRN not found.');

    // Build map of grn items
    const grnItemMap = new Map<number, GrnItem>();
    grn.items.forEach((i) => grnItemMap.set(i.id, i));

    // Validate each qc item references a grn item
    for (const it of dto.items) {
      const gi = grnItemMap.get(it.grn_item_id);
      if (!gi)
        throw new BadRequestException(
          `GRN item ${it.grn_item_id} does not belong to GRN ${dto.grn_id}`,
        );
      if (it.checked_qty > gi.received_qty)
        throw new BadRequestException(
          'Checked quantity cannot exceed received quantity.',
        );
      if (it.passed_qty + it.failed_qty !== it.checked_qty)
        throw new BadRequestException(
          'Passed + Failed must equal Checked quantity.',
        );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const qcNumber = await this.generateQcNumber(companyId);
      const qc = this.qcRepo.create({
        company_id: companyId,
        qc_number: qcNumber,
        qc_date: dto.qc_date,
        grn,
        inspector: dto.inspector,
        remarks: dto.remarks,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        status: (dto.status ?? 'pending') as any,
      });
      const savedQc = await queryRunner.manager.save(QualityCheck, qc);

      // Create QC items and update grn_item.qc_checked_qty
      for (const it of dto.items) {
        const grnItem = grnItemMap.get(it.grn_item_id)!;
        const item = grnItem.item;
        const qcItem = this.qcItemRepo.create({
          quality_check: savedQc,
          grn_item: grnItem,
          item,
          checked_qty: it.checked_qty,
          passed_qty: it.passed_qty,
          failed_qty: it.failed_qty,
          remarks: it.remarks,
        });
        await queryRunner.manager.save(QCItem, qcItem);

        // Update grn_item.qc_checked_qty (accumulate if multiple QCs possible)
        grnItem.qc_checked_qty = (grnItem.qc_checked_qty || 0) + it.checked_qty;
        await queryRunner.manager.save(GrnItem, grnItem);
      }

      await queryRunner.commitTransaction();
      return (await this.qcRepo.findOne({
        where: { id: savedQc.id },
      })) as QualityCheck;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(params: { status?: string; grn_id?: number } | undefined, companyId: number) {
    const qb = this.qcRepo
      .createQueryBuilder('qc')
      .leftJoinAndSelect('qc.items', 'items')
      .leftJoinAndSelect('qc.grn', 'grn')
      .where('qc.company_id = :companyId', { companyId });
    if (params?.status)
      qb.andWhere('qc.status = :status', { status: params.status });
    if (params?.grn_id) qb.andWhere('grn.id = :gid', { gid: params.grn_id });
    qb.orderBy('qc.qc_date', 'DESC');
    return qb.getMany();
  }

  async findOne(id: number, companyId: number) {
    const qc = await this.qcRepo.findOne({
      where: { id, company_id: companyId },
    });
    if (!qc) throw new NotFoundException('Quality check not found.');
    return qc;
  }

  async update(id: number, dto: Partial<CreateQualityCheckDto>, companyId: number) {
    const qc = await this.qcRepo.findOne({
      where: { id, company_id: companyId },
      relations: ['items'],
    });
    if (!qc) throw new NotFoundException('Quality check not found.');

    // For simplicity allow updating metadata/status only. Item-level edits are possible but more complex
    if (dto.inspector) qc.inspector = dto.inspector;
    if (dto.remarks !== undefined) qc.remarks = dto.remarks;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (dto.status) qc.status = dto.status as any;
    if (dto.qc_date) qc.qc_date = dto.qc_date;

    return this.qcRepo.save(qc);
  }

  async remove(id: number, companyId: number) {
    const res = await this.qcRepo.delete({ id, company_id: companyId });
    if (!res.affected) throw new NotFoundException('Quality check not found.');
  }
}
