import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
  ) {}

  private async generateSku(companyId: number): Promise<string> {
    // ✅ FIX: केवल एक बार declare करें और 'where: {}' का उपयोग करें
    const last = await this.repo.findOne({
      where: { company_id: companyId },
      order: { id: 'DESC' },
      withDeleted: false,
    });

    const nextNum = last?.sku
      ? parseInt(String(last.sku).split('-').pop() || '0', 10) + 1
      : 1;

    return `ITEM-${String(nextNum).padStart(5, '0')}`;
  }

  async create(dto: CreateItemDto, companyId: number): Promise<Item> {
    if (!dto.sku) dto.sku = await this.generateSku(companyId);

    const existing = await this.repo.findOne({
      where: [
        { sku: dto.sku, company_id: companyId },
        { name: dto.name, company_id: companyId },
      ],
    });
    if (existing)
      throw new ConflictException('Item with same SKU or name already exists.');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entity = this.repo.create({ ...dto, company_id: companyId } as any) as unknown as Item;
    return this.repo.save(entity);
  }

  async findAll(
    companyId: number,
    params?: {
      search?: string;
      status?: string;
      limit?: number;
      offset?: number;
    },
  ): Promise<Item[]> {
    const where: any = { company_id: companyId };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (params?.status) where.is_active = params.status === 'active';

    if (params?.search) {
      const q = params.search;
      return this.repo.find({
        where: [
          { ...where, name: ILike(`%${q}%`) },
          { ...where, sku: ILike(`%${q}%`) },
          { ...where, description: ILike(`%${q}%`) },
        ],
        order: { name: 'ASC' },
        take: params.limit,
        skip: params.offset,
      });
    }

    return this.repo.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      order: { name: 'ASC' },
      take: params?.limit,
      skip: params?.offset,
    });
  }

  async findOne(id: number, companyId: number): Promise<Item> {
    const item = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!item) throw new NotFoundException('Item not found.');
    return item;
  }

  /**
   * Resolve an item by its SKU/code. Used by modules (dispatch, FGR) that
   * only know the item's code, not its numeric id.
   */
  async findByCode(code: string, companyId: number): Promise<Item> {
    const item = await this.repo.findOne({ where: { sku: code, company_id: companyId } });
    if (!item) throw new NotFoundException(`Item with code "${code}" not found.`);
    return item;
  }

  async update(id: number, dto: UpdateItemDto, companyId: number): Promise<Item> {
    const item = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!item) throw new NotFoundException('Item not found.');

    if (dto.sku && dto.sku !== item.sku) {
      const skuExists = await this.repo.findOne({ where: { sku: dto.sku, company_id: companyId } });
      if (skuExists) throw new ConflictException('SKU already in use.');
    }

    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const res = await this.repo.softDelete({ id, company_id: companyId });
    if (!res.affected) throw new NotFoundException('Item not found.');
  }

  async count(companyId: number): Promise<number> {
    return this.repo.count({ where: { company_id: companyId } });
  }
}
