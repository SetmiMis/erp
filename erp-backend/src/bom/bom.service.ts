import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Bom } from './entities/bom.entity';
import { BomItem } from './entities/bom-item.entity';
import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';

// Postgres unique_violation -- see AddBomVersioningConstraints1786172699870.
const UNIQUE_VIOLATION = '23505';

@Injectable()
export class BomService {
  constructor(
    @InjectRepository(Bom) private bomRepo: Repository<Bom>,
    @InjectRepository(BomItem) private bomItemRepo: Repository<BomItem>,
    private dataSource: DataSource, // DataSource को Inject करें
  ) {}

  /**
   * PLAN.md step 1.3: at most one active BOM per (company, fg_item) is a DB
   * constraint (AddBomVersioningConstraints1786172699870), but the DB can
   * only reject a second active row -- it can't know a newly-activated
   * version should replace the old one. This deactivates the current
   * sibling(s) first so activating a new version reads as "promote this
   * one" instead of "fails until you manually deactivate the old one".
   */
  private async deactivateSiblingVersions(
    manager: EntityManager,
    companyId: number,
    fgItemId: number,
    excludeBomId?: number,
  ): Promise<void> {
    const qb = manager
      .createQueryBuilder()
      .update(Bom)
      .set({ is_active: false })
      .where('company_id = :companyId', { companyId })
      .andWhere('fg_item_id = :fgItemId', { fgItemId })
      .andWhere('is_active = true');
    if (excludeBomId) {
      qb.andWhere('id != :excludeBomId', { excludeBomId });
    }
    await qb.execute();
  }

  async create(createDto: CreateBomDto, companyId: number) {
    const isActive = createDto.is_active ?? true;
    // सारे ऑपरेशन्स को एक ट्रांजैक्शन में चलाएं
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          if (isActive && createDto.fg_item_id) {
            await this.deactivateSiblingVersions(
              transactionalEntityManager,
              companyId,
              createDto.fg_item_id,
            );
          }

          const bom = transactionalEntityManager.create(Bom, {
            company_id: companyId,
            name: createDto.name,
            code: createDto.code,
            description: createDto.description,
            status: createDto.status || 'active',
            fg_item_id: createDto.fg_item_id ?? null,
            version: createDto.version || 'V1',
            is_active: isActive,
          });
          const savedBom = await transactionalEntityManager.save(bom);

          const items = createDto.items.map((it) =>
            transactionalEntityManager.create(BomItem, {
              bom_id: savedBom.id,
              item_id: it.item_id,
              qty: it.qty,
              uom: it.uom,
              remarks: it.remarks,
            }),
          );
          await transactionalEntityManager.save(items);

          // ट्रांजैक्शन से ही फाइनल डेटा पाएं
          return transactionalEntityManager.findOne(Bom, {
            where: { id: savedBom.id },
            relations: ['items'],
          });
        },
      );
    } catch (err) {
      throw this.translateVersionConflict(err);
    }
  }

  private translateVersionConflict(err: unknown): unknown {
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      (err as { code?: string }).code === UNIQUE_VIOLATION
    ) {
      return new ConflictException(
        'A BOM with this version already exists for this finished item.',
      );
    }
    return err;
  }

  async findAll(companyId: number) {
    const boms = await this.bomRepo.find({
      where: { company_id: companyId },
      relations: ['items'],
      order: { created_at: 'DESC' },
    });
    // components_count is a convenience for list views (e.g. erp-frontend BOM list)
    // so they don't need to fetch full item relations just to show a count.
    return boms.map((bom) => ({
      ...bom,
      components_count: bom.items?.length ?? 0,
    }));
  }

  async findOne(id: number, companyId: number) {
    const bom = await this.bomRepo.findOne({
      where: { id, company_id: companyId },
      relations: ['items'],
    });
    if (!bom) {
      throw new NotFoundException('BOM not found');
    }
    return bom;
  }

  async update(id: number, updateDto: UpdateBomDto, companyId: number) {
    try {
      return await this.dataSource.transaction((manager) =>
        this.updateInTransaction(manager, id, updateDto, companyId),
      );
    } catch (err) {
      throw this.translateVersionConflict(err);
    }
  }

  private async updateInTransaction(
    transactionalEntityManager: EntityManager,
    id: number,
    updateDto: UpdateBomDto,
    companyId: number,
  ) {
    const bom = await transactionalEntityManager.findOne(Bom, {
      where: { id, company_id: companyId },
    });
    if (!bom) {
      throw new NotFoundException('BOM not found');
    }

    // Effective post-merge state: whichever of these updateDto doesn't
    // touch, the existing row's value carries through.
    const willBeActive = updateDto.is_active ?? bom.is_active;
    const effectiveFgItemId = updateDto.fg_item_id ?? bom.fg_item_id;
    if (willBeActive && effectiveFgItemId) {
      await this.deactivateSiblingVersions(
        transactionalEntityManager,
        companyId,
        effectiveFgItemId,
        id,
      );
    }

    transactionalEntityManager.merge(Bom, bom, updateDto);
    await transactionalEntityManager.save(Bom, bom);

    // अगर items अपडेट हो रहे हैं, तो पुराने डिलीट करके नए सेव करें
    if (updateDto.items) {
      await transactionalEntityManager.delete(BomItem, { bom_id: id });
      const items = updateDto.items.map((it) =>
        transactionalEntityManager.create(BomItem, {
          bom_id: id,
          item_id: it.item_id,
          qty: it.qty,
          uom: it.uom,
          remarks: it.remarks,
        }),
      );
      await transactionalEntityManager.save(BomItem, items);
    }

    return transactionalEntityManager.findOne(Bom, {
      where: { id },
      relations: ['items'],
    });
  }

  async remove(id: number, companyId: number) {
    // डिलीट करने से पहले चेक करें कि BOM मौजूद है या नहीं
    await this.findOne(id, companyId);

    // **नोट**: सबसे अच्छे तरीके के लिए, अपनी Bom Entity में onDelete: 'CASCADE' सेट करें।
    // इससे संबंधित सभी BomItem अपने आप डिलीट हो जाएंगे।

    // अब BOM को डिलीट करें
    const res = await this.bomRepo.delete({ id, company_id: companyId });

    // Optional chaining (?) का उपयोग करना ज्यादा सुरक्षित है
    return !!(res && res.affected && res.affected > 0);
  }

  /**
   * PLAN.md step 1.4: a finished item's cost, rolled up from its BOM's
   * component quantities x each component's current `items.purchase_rate`.
   * Deliberately re-priced from the live item rate on every call rather
   * than a cached/stored cost -- a component's purchase_rate changing
   * should be reflected immediately, not require someone to re-save every
   * BOM that uses it.
   */
  async getCostRollup(bomId: number, companyId: number) {
    const bom = await this.findOne(bomId, companyId);

    const rows = await this.bomItemRepo
      .createQueryBuilder('bi')
      .innerJoin('items', 'item', 'item.id = bi.item_id')
      .where('bi.bom_id = :bomId', { bomId })
      .select([
        'bi.item_id AS item_id',
        'bi.qty AS qty',
        'item.name AS item_name',
        'item.sku AS item_code',
        'item.purchase_rate AS unit_cost',
      ])
      .getRawMany<{
        item_id: number;
        qty: string;
        item_name: string;
        item_code: string | null;
        unit_cost: string;
      }>();

    const components = rows.map((r) => {
      const qty = Number(r.qty);
      const unit_cost = Number(r.unit_cost);
      return {
        item_id: r.item_id,
        item_name: r.item_name,
        item_code: r.item_code,
        qty,
        unit_cost,
        line_cost: qty * unit_cost,
      };
    });

    return {
      bom_id: bom.id,
      fg_item_id: bom.fg_item_id,
      version: bom.version,
      is_active: bom.is_active,
      total_cost: components.reduce((sum, c) => sum + c.line_cost, 0),
      components,
    };
  }

  /** Cost rollup for whichever BOM is currently active for a finished item. */
  async getActiveCostForItem(fgItemId: number, companyId: number) {
    const activeBom = await this.bomRepo.findOne({
      where: { company_id: companyId, fg_item_id: fgItemId, is_active: true },
    });
    if (!activeBom) {
      throw new NotFoundException(`No active BOM found for item #${fgItemId}`);
    }
    return this.getCostRollup(activeBom.id, companyId);
  }
}
