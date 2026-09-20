import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto, QuerySupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

// Multi-company Phase 1: every method takes companyId and every query is
// scoped by it — see Multi-Company Architecture Audit §4/§11. This is the
// representative pattern applied identically across the other repo-based
// services (customers, warehouses, locations, etc.).
@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repo: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto, companyId: number): Promise<Supplier> {
    if (!dto.supplier_code) {
      const last = await this.repo.findOne({
        where: { company_id: companyId },
        order: { id: 'DESC' },
        withDeleted: false,
      });
      const nextNum = last?.supplier_code
        ? parseInt(last.supplier_code.split('-')[1]) + 1
        : 1;
      dto.supplier_code = `SUP-${String(nextNum).padStart(3, '0')}`;
    }

    const duplicate = await this.repo.findOne({
      where: [
        { company_id: companyId, email: dto.email },
        { company_id: companyId, supplier_code: dto.supplier_code },
      ],
    });
    if (duplicate)
      throw new ConflictException('Supplier with this email or code exists.');

    const entity = this.repo.create({ ...dto, company_id: companyId });
    return this.repo.save(entity);
  }

  async findAll(query: QuerySupplierDto, companyId: number): Promise<Supplier[]> {
    const where: any = { company_id: companyId };

    if (query.status)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-enum-comparison
      where.is_active = query.status === 'active' ? true : false;

    if (query.search) {
      return this.repo.find({
        where: [
          { ...where, name: ILike(`%${query.search}%`) },

          { ...where, supplier_code: ILike(`%${query.search}%`) },

          { ...where, contact_person: ILike(`%${query.search}%`) },

          { ...where, email: ILike(`%${query.search}%`) },
        ],
        order: { name: 'ASC' },
      });
    }

    return this.repo.find({ where, order: { name: 'ASC' } });
  }

  async findOne(id: number, companyId: number): Promise<Supplier> {
    const supplier = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async update(id: number, dto: UpdateSupplierDto, companyId: number): Promise<Supplier> {
    const existing = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!existing) throw new NotFoundException('Supplier not found');

    if (dto.email && dto.email !== existing.email) {
      const emailExists = await this.repo.findOne({
        where: { email: dto.email, company_id: companyId },
      });
      if (emailExists)
        throw new ConflictException('Email already used by another supplier');
    }

    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const res = await this.repo.softDelete({ id, company_id: companyId });
    if (!res.affected) throw new NotFoundException('Supplier not found');
  }

  async count(companyId: number): Promise<number> {
    return this.repo.count({ where: { company_id: companyId } });
  }
}
