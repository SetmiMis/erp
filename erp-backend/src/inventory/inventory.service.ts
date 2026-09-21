import { Injectable, BadRequestException } from '@nestjs/common';
import {
  Repository,
  QueryRunner,
  DataSource,
  EntityManager,
  IsNull,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockItem } from './stock-item.entity';
import { StockLedger } from './stock-ledger.entity';

/**
 * InventoryService provides simple atomic helpers:
 * - checkAvailability(item_id, warehouse_id, qty, companyId, queryRunner?)
 * - decreaseStock(item_id, warehouse_id, qty, companyId, opts)
 * - increaseStock(item_id, warehouse_id, qty, companyId, opts)
 *
 * opts: { reference_type, reference_id, remarks, queryRunner }
 *
 * Multi-company Phase 1: every method takes companyId — item_id/warehouse_id
 * alone already belong to exactly one company transitively, but stock_items/
 * stock_ledger carry their own company_id column too (see Multi-Company
 * Architecture Audit §6) so every query here filters directly on it rather
 * than trusting an unscoped item_id/warehouse_id pair.
 *
 * Audit fix #4 (AUDIT_REPORT.md §1.6): decreaseStock/increaseStock used to
 * read the current StockItem row, compute a new balance in application
 * memory, then save it — with no row lock and, for callers that didn't pass
 * a queryRunner (e.g. the manual stock-adjust endpoint), no transaction at
 * all. Two concurrent movements against the same (item_id, warehouse_id)
 * could both read the same starting quantity and silently lose one of the
 * updates, or race past the "enough stock?" check and drive the balance
 * negative. mutateStock() below is now the single place either operation
 * happens: it always runs inside a transaction (the caller's, if a
 * queryRunner was passed — every real caller already opens one; see
 * dispatch.service.ts, grn.service.ts, fgr.service.ts, production.service.ts
 * — otherwise one this service opens and manages itself) and takes a
 * pessimistic write lock on the StockItem row before computing the new
 * balance, so a concurrent writer for the same row blocks until this
 * transaction commits instead of racing it.
 */
@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(StockItem)
    private stockItemRepo: Repository<StockItem>,
    @InjectRepository(StockLedger)
    private stockLedgerRepo: Repository<StockLedger>,
    private dataSource: DataSource,
  ) {}

  // helper: fetch StockItem with optional queryRunner. `batch_no` undefined
  // means "the no-batch row" (batch_no IS NULL) -- the same single row every
  // item used before batch tracking existed (PLAN.md step 1.6).
  private async findStockRow(
    item_id: number,
    warehouse_id: number,
    companyId: number,
    qr?: QueryRunner,
    batch_no?: string,
  ): Promise<StockItem | null> {
    const repo = qr ? qr.manager.getRepository(StockItem) : this.stockItemRepo;
    return repo.findOne({
      where: {
        item_id,
        warehouse_id,
        company_id: companyId,
        batch_no: batch_no ?? IsNull(),
      },
    });
  }

  // check availability (throws if not enough) against a specific batch (or
  // the no-batch row, if batch_no is omitted).
  async checkAvailability(
    item_id: number,
    warehouse_id: number,
    qty: number,
    companyId: number,
    qr?: QueryRunner,
    batch_no?: string,
  ) {
    const row = await this.findStockRow(
      item_id,
      warehouse_id,
      companyId,
      qr,
      batch_no,
    );
    const available = row ? Number(row.quantity) : 0;
    if (available < qty) {
      throw new BadRequestException(
        `Insufficient stock for item ${item_id} in warehouse ${warehouse_id}${
          batch_no ? ` (batch ${batch_no})` : ''
        }. Available ${available}, required ${qty}`,
      );
    }
    return true;
  }

  /**
   * PLAN.md step 1.6: availability check for a FEFO dispatch, which can draw
   * from more than one batch -- sums every batch row for this item/warehouse
   * rather than checking one row like checkAvailability() does. Used
   * up-front (before any stock is touched) so a partially-fulfillable FEFO
   * dispatch still fails clean, same guarantee checkAvailability() already
   * gives single-batch/no-batch lines.
   */
  async checkAvailabilityAcrossBatches(
    item_id: number,
    warehouse_id: number,
    qty: number,
    companyId: number,
    qr?: QueryRunner,
  ) {
    const repo = qr ? qr.manager.getRepository(StockItem) : this.stockItemRepo;
    const rows = await repo.find({
      where: { item_id, warehouse_id, company_id: companyId },
    });
    const available = rows.reduce((sum, r) => sum + Number(r.quantity), 0);
    if (available < qty) {
      throw new BadRequestException(
        `Insufficient stock for item ${item_id} in warehouse ${warehouse_id} across all batches. Available ${available}, required ${qty}`,
      );
    }
    return true;
  }

  /**
   * Every batch currently in stock for an item/warehouse, oldest-expiry
   * first (nulls -- no expiry set -- sort last, Postgres's default for
   * ASC). Used to populate a "pick a batch" UI and as the consumption order
   * for FEFO dispatch below.
   */
  async getBatches(
    item_id: number,
    warehouse_id: number,
    companyId: number,
  ): Promise<StockItem[]> {
    return this.stockItemRepo.find({
      where: { item_id, warehouse_id, company_id: companyId },
      order: { expiry_date: 'ASC' },
    });
  }

  /**
   * Shared core for decreaseStock/increaseStock (see class-level comment for
   * why this exists). `delta` is signed: positive increases the balance,
   * negative decreases it. Always called with a manager that belongs to an
   * open transaction — either the caller's (via their queryRunner) or one
   * this service opened itself in runMutation() below.
   */
  private async mutateStock(
    manager: EntityManager,
    item_id: number,
    warehouse_id: number,
    delta: number,
    companyId: number,
    opts: {
      reference_type: string;
      reference_id: number | null;
      remarks: string | null;
    },
    batch_no?: string | null,
    expiry_date?: string | null,
  ): Promise<{ newQty: number }> {
    const stockRepo = manager.getRepository(StockItem);
    const ledgerRepo = manager.getRepository(StockLedger);
    const normalizedBatchNo = batch_no ?? null;

    // Pessimistic write lock: blocks any other transaction trying to read
    // (with a lock) or write this same row until this transaction commits
    // or rolls back — the fix for the lost-update race described above.
    // PLAN.md step 1.6: scoped to the specific batch row (or the no-batch
    // row, batch_no IS NULL, for every item that isn't batch-tracked).
    let row = await stockRepo.findOne({
      where: {
        item_id,
        warehouse_id,
        company_id: companyId,
        batch_no: normalizedBatchNo ?? IsNull(),
      },
      lock: { mode: 'pessimistic_write' },
    });
    const prevQty = row ? Number(row.quantity) : 0;
    const newQty = prevQty + delta;

    if (newQty < 0) {
      throw new BadRequestException(
        `Insufficient stock for item ${item_id} in warehouse ${warehouse_id}${
          normalizedBatchNo ? ` (batch ${normalizedBatchNo})` : ''
        }. Available ${prevQty}, required ${-delta}.`,
      );
    }

    if (row) {
      row.quantity = newQty;
      row.updated_at = new Date();
      // A later receipt of the same batch can carry a (re-confirmed) expiry
      // date even though the row already exists.
      if (expiry_date) row.expiry_date = expiry_date;
      await stockRepo.save(row);
    } else {
      row = stockRepo.create({
        item_id,
        warehouse_id,
        company_id: companyId,
        quantity: newQty,
        batch_no: normalizedBatchNo,
        expiry_date: expiry_date ?? null,
      });
      await stockRepo.save(row);
    }

    const ledger = ledgerRepo.create({
      company_id: companyId,
      item_id,
      warehouse_id,
      qty_in: delta > 0 ? delta : 0,
      qty_out: delta < 0 ? -delta : 0,
      balance: newQty,
      reference_type: opts.reference_type,
      reference_id: opts.reference_id,
      remarks: opts.remarks,
      batch_no: normalizedBatchNo,
      expiry_date: expiry_date ?? null,
    } as StockLedger);
    await ledgerRepo.save(ledger);

    return { newQty };
  }

  private async runMutation(
    item_id: number,
    warehouse_id: number,
    delta: number,
    companyId: number,
    opts: {
      reference_type?: string;
      reference_id?: number;
      remarks?: string;
      queryRunner?: QueryRunner;
      batch_no?: string;
      expiry_date?: string;
    },
  ): Promise<{ newQty: number }> {
    const mutationOpts = {
      reference_type: opts.reference_type ?? 'unknown',
      reference_id: opts.reference_id ?? null,
      remarks: opts.remarks ?? null,
    };

    if (opts.queryRunner) {
      return this.mutateStock(
        opts.queryRunner.manager,
        item_id,
        warehouse_id,
        delta,
        companyId,
        mutationOpts,
        opts.batch_no,
        opts.expiry_date,
      );
    }

    // No caller-supplied transaction (e.g. the manual stock-adjust endpoint)
    // — open and manage our own so the lock+read+write+ledger sequence is
    // still atomic.
    return this.dataSource.transaction((manager) =>
      this.mutateStock(
        manager,
        item_id,
        warehouse_id,
        delta,
        companyId,
        mutationOpts,
        opts.batch_no,
        opts.expiry_date,
      ),
    );
  }

  // decreaseStock: will create or update stock_items row and create a stock_ledger entry
  async decreaseStock(
    item_id: number,
    warehouse_id: number,
    qty: number,
    companyId: number,
    opts: {
      reference_type?: string;
      reference_id?: number;
      remarks?: string;
      queryRunner?: QueryRunner;
      batch_no?: string;
    } = {},
  ) {
    if (qty <= 0) throw new BadRequestException('Quantity must be > 0');
    return this.runMutation(item_id, warehouse_id, -qty, companyId, opts);
  }

  // increaseStock: increment and create ledger
  async increaseStock(
    item_id: number,
    warehouse_id: number,
    qty: number,
    companyId: number,
    opts: {
      reference_type?: string;
      reference_id?: number;
      remarks?: string;
      queryRunner?: QueryRunner;
      batch_no?: string;
      expiry_date?: string;
    } = {},
  ) {
    if (qty <= 0) throw new BadRequestException('Quantity must be > 0');
    return this.runMutation(item_id, warehouse_id, qty, companyId, opts);
  }

  /**
   * PLAN.md step 1.6: FEFO (first-expiry-first-out) dispatch. Consumes
   * whichever batches exist for this item/warehouse in expiry order,
   * spanning as many as needed to cover `qty` -- unlike decreaseStock()
   * above, which always targets exactly one row (a specific batch, or the
   * no-batch row). Caller must have already checked
   * checkAvailabilityAcrossBatches() so this doesn't run out partway
   * through and leave some batches decremented and others not; it still
   * re-derives availability itself (via mutateStock's own check) as a
   * backstop, same as every other mutation here.
   */
  async decreaseStockFefo(
    item_id: number,
    warehouse_id: number,
    qty: number,
    companyId: number,
    opts: {
      reference_type?: string;
      reference_id?: number;
      remarks?: string;
      queryRunner?: QueryRunner;
    } = {},
  ): Promise<{ consumed: { batch_no: string | null; qty: number }[] }> {
    if (qty <= 0) throw new BadRequestException('Quantity must be > 0');
    const mutationOpts = {
      reference_type: opts.reference_type ?? 'unknown',
      reference_id: opts.reference_id ?? null,
      remarks: opts.remarks ?? null,
    };

    const run = async (manager: EntityManager) => {
      const batches = await manager.getRepository(StockItem).find({
        where: { item_id, warehouse_id, company_id: companyId },
        order: { expiry_date: 'ASC' },
      });

      let remaining = qty;
      const consumed: { batch_no: string | null; qty: number }[] = [];
      for (const batch of batches) {
        if (remaining <= 0) break;
        const available = Number(batch.quantity);
        if (available <= 0) continue;
        const take = Math.min(available, remaining);
        await this.mutateStock(
          manager,
          item_id,
          warehouse_id,
          -take,
          companyId,
          mutationOpts,
          batch.batch_no,
        );
        consumed.push({ batch_no: batch.batch_no, qty: take });
        remaining -= take;
      }

      if (remaining > 0) {
        throw new BadRequestException(
          `Insufficient stock for item ${item_id} in warehouse ${warehouse_id} across all batches. Short by ${remaining}.`,
        );
      }
      return { consumed };
    };

    if (opts.queryRunner) return run(opts.queryRunner.manager);
    return this.dataSource.transaction(run);
  }

  // convenience: get balance
  async getBalance(
    item_id: number,
    warehouse_id: number,
    companyId: number,
    qr?: QueryRunner,
  ) {
    const row = await this.findStockRow(item_id, warehouse_id, companyId, qr);
    return row ? Number(row.quantity) : 0;
  }

  /**
   * Reverses every stock movement previously recorded against
   * (reference_type, reference_id) — e.g. a dispatch order or FGR being
   * deleted or edited. Without this, removing/changing the header row leaves
   * the stock balance permanently wrong (decreased/increased with nothing to
   * show for it). Must be called inside the same transaction as the
   * document's own delete/update, via the caller's queryRunner, so a failure
   * rolls back both together.
   *
   * Returns the original (now-reversed) movements so a caller re-applying
   * new quantities (an update, not a delete) can fall back to the original
   * item/warehouse when the request didn't change them.
   */
  async reverseMovements(
    companyId: number,
    referenceType: string,
    referenceId: number,
    queryRunner: QueryRunner,
  ): Promise<StockLedger[]> {
    const ledgerRepo = queryRunner.manager.getRepository(StockLedger);
    const movements = await ledgerRepo.find({
      where: {
        company_id: companyId,
        reference_type: referenceType,
        reference_id: referenceId,
      },
    });

    for (const movement of movements) {
      const originalDelta = Number(movement.qty_in) - Number(movement.qty_out);
      if (originalDelta === 0) continue;

      await this.mutateStock(
        queryRunner.manager,
        movement.item_id,
        movement.warehouse_id,
        -originalDelta,
        companyId,
        {
          reference_type: `${referenceType}_reversal`,
          reference_id: referenceId,
          remarks: `Reversal of ${referenceType} #${referenceId}`,
        },
        // PLAN.md step 1.6: reverse against the same batch the original
        // movement was against, not the no-batch row.
        movement.batch_no,
      );
    }

    return movements;
  }

  // --- Dashboard & Analytics ---
  // StockItem carries no TypeORM relations (just numeric item_id/warehouse_id),
  // so these join against the 'items'/'warehouses' tables directly by id.

  async getTotalStockValue(companyId: number): Promise<number> {
    const result = await this.stockItemRepo
      .createQueryBuilder('si')
      .innerJoin('items', 'item', 'item.id = si.item_id')
      .where('si.company_id = :companyId', { companyId })
      .select('SUM(si.quantity * item.purchase_rate)', 'totalValue')
      .getRawOne<{ totalValue: string | null }>();
    return parseFloat(result?.totalValue ?? '0') || 0;
  }

  /** Base query joining stock_items -> items -> warehouses, flattened for reporting/dashboard use. */
  private stockDetailsQuery(companyId: number) {
    return this.stockItemRepo
      .createQueryBuilder('si')
      .innerJoin('items', 'item', 'item.id = si.item_id')
      .innerJoin('warehouses', 'wh', 'wh.id = si.warehouse_id')
      .where('si.company_id = :companyId', { companyId })
      .select([
        'si.id AS id',
        'si.item_id AS item_id',
        'si.warehouse_id AS warehouse_id',
        'si.quantity AS quantity',
        'si.batch_no AS batch_no',
        'si.expiry_date AS expiry_date',
        'item.name AS item_name',
        'item.sku AS item_code',
        'item.unit AS uom',
        'item.reorder_level AS reorder_level',
        'wh.name AS warehouse_name',
      ]);
  }

  async getLowStockItems(
    companyId: number,
    limit = 10,
  ): Promise<StockDetailRow[]> {
    return this.stockDetailsQuery(companyId)
      .andWhere('si.quantity <= item.reorder_level AND item.reorder_level > 0')
      .orderBy('si.quantity', 'ASC')
      .limit(limit)
      .getRawMany();
  }

  /** All current stock rows with item/warehouse details, for the stock report and current-stock page. */
  async getAllStockWithDetails(
    companyId: number,
    filters?: {
      search?: string;
      warehouse_id?: number;
    },
  ): Promise<StockDetailRow[]> {
    const qb = this.stockDetailsQuery(companyId);
    if (filters?.warehouse_id) {
      qb.andWhere('si.warehouse_id = :warehouse_id', {
        warehouse_id: filters.warehouse_id,
      });
    }
    if (filters?.search) {
      qb.andWhere('(item.name ILIKE :q OR item.sku ILIKE :q)', {
        q: `%${filters.search}%`,
      });
    }
    return qb.orderBy('item.name', 'ASC').getRawMany();
  }

  /**
   * Stock ledger entries with item/warehouse details, for the stock ledger
   * page. PLAN.md step 1.1: this used to be a hardcoded LIMIT 500 with no
   * way to see anything past the 500 most recent movements -- fine at
   * today's row counts, a real gap once a company has been running long
   * enough to generate more than 500 movements total. Now real offset
   * pagination, backed by the (company_id, created_at) index added
   * alongside this change.
   */
  async getLedger(
    companyId: number,
    filters?: {
      search?: string;
      warehouse_id?: number;
      limit?: number;
      offset?: number;
    },
  ): Promise<{
    rows: LedgerRow[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const limit = Math.min(Math.max(filters?.limit ?? 50, 1), 200);
    const offset = Math.max(filters?.offset ?? 0, 0);

    const baseQb = this.stockLedgerRepo
      .createQueryBuilder('sl')
      .innerJoin('items', 'item', 'item.id = sl.item_id')
      .innerJoin('warehouses', 'wh', 'wh.id = sl.warehouse_id')
      .where('sl.company_id = :companyId', { companyId });

    if (filters?.warehouse_id) {
      baseQb.andWhere('sl.warehouse_id = :warehouse_id', {
        warehouse_id: filters.warehouse_id,
      });
    }
    if (filters?.search) {
      baseQb.andWhere('(item.name ILIKE :q OR item.sku ILIKE :q)', {
        q: `%${filters.search}%`,
      });
    }

    // Counted before .select()/.orderBy()/.limit()/.offset() are applied so
    // it reflects the same filters without those clauses affecting it.
    const total = await baseQb.getCount();

    const rows = await baseQb
      .select([
        'sl.id AS id',
        'sl.created_at AS transaction_date',
        'item.sku AS item_code',
        'item.name AS item_name',
        'wh.name AS warehouse_name',
        'sl.qty_in AS in_qty',
        'sl.qty_out AS out_qty',
        'sl.balance AS balance_qty',
        'sl.reference_type AS reference_type',
        'sl.reference_id AS reference_id',
        'sl.remarks AS remarks',
        'sl.batch_no AS batch_no',
      ])
      // id as a tie-breaker: created_at alone isn't unique, so without this
      // two rows with the same timestamp could land in either order across
      // pages (page 1 could repeat or skip a row page 2 also has/misses).
      .orderBy('sl.created_at', 'DESC')
      .addOrderBy('sl.id', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany<LedgerRow>();

    return { rows, total, limit, offset };
  }
}

export interface StockDetailRow {
  id: number;
  item_id: number;
  warehouse_id: number;
  quantity: number;
  batch_no: string | null;
  expiry_date: string | null;
  item_name: string;
  item_code: string | null;
  uom: string | null;
  reorder_level: number | null;
  warehouse_name: string;
}

export interface LedgerRow {
  id: number;
  transaction_date: string;
  item_code: string | null;
  item_name: string;
  warehouse_name: string;
  in_qty: number;
  out_qty: number;
  balance_qty: number;
  reference_type: string | null;
  reference_id: number | null;
  remarks: string | null;
  batch_no: string | null;
}
