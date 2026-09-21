import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { InventoryService } from './inventory.service';
import { StockItem } from './stock-item.entity';
import { StockLedger } from './stock-ledger.entity';

// PLAN.md step 1.6: batch/lot tracking. These tests use a small in-memory
// fake of the StockItem/StockLedger repositories (keyed by
// item/warehouse/batch) rather than mocking every TypeORM call, because the
// behavior worth verifying here is the actual row bookkeeping -- one row
// per batch, FEFO consumption order, correct reversal target -- not just
// "was this method called".
const TEST_COMPANY_ID = 1;

function key(itemId: number, warehouseId: number, batchNo: string | null) {
  return `${itemId}|${warehouseId}|${batchNo ?? ''}`;
}

function isNullOperator(value: unknown): boolean {
  return (
    !!value &&
    typeof value === 'object' &&
    (value as { type?: string }).type === 'isNull'
  );
}

class FakeDb {
  stockRows = new Map<string, StockItem>();
  ledgerRows: StockLedger[] = [];
  private nextStockId = 1;
  private nextLedgerId = 1;

  makeStockRepo() {
    return {
      findOne: ({ where }: { where: Record<string, unknown> }) => {
        const batchNo = isNullOperator(where.batch_no)
          ? null
          : (where.batch_no as string | null);
        const row = this.stockRows.get(
          key(where.item_id as number, where.warehouse_id as number, batchNo),
        );
        return Promise.resolve(row ? { ...row } : null);
      },
      find: ({
        where,
        order,
      }: {
        where: Record<string, unknown>;
        order?: { expiry_date?: 'ASC' | 'DESC' };
      }) => {
        const rows = [...this.stockRows.values()]
          .filter(
            (r) =>
              r.item_id === where.item_id &&
              r.warehouse_id === where.warehouse_id,
          )
          .map((r) => ({ ...r }));
        if (order?.expiry_date === 'ASC') {
          // Postgres's real default for ASC: nulls sort last.
          rows.sort((a, b) => {
            if (!a.expiry_date && !b.expiry_date) return 0;
            if (!a.expiry_date) return 1;
            if (!b.expiry_date) return -1;
            return a.expiry_date < b.expiry_date ? -1 : 1;
          });
        }
        return Promise.resolve(rows);
      },
      create: (data: Partial<StockItem>) => data as StockItem,
      save: (row: StockItem) => {
        const saved: StockItem = { ...row, id: row.id ?? this.nextStockId++ };
        this.stockRows.set(
          key(saved.item_id, saved.warehouse_id, saved.batch_no ?? null),
          saved,
        );
        return Promise.resolve(saved);
      },
    };
  }

  makeLedgerRepo() {
    return {
      create: (data: Partial<StockLedger>) => data as StockLedger,
      save: (row: StockLedger) => {
        const saved = { ...row, id: this.nextLedgerId++ } as StockLedger;
        this.ledgerRows.push(saved);
        return Promise.resolve(saved);
      },
      find: ({ where }: { where: Record<string, unknown> }) =>
        Promise.resolve(
          this.ledgerRows.filter(
            (r) =>
              r.company_id === where.company_id &&
              r.reference_type === where.reference_type &&
              r.reference_id === where.reference_id,
          ),
        ),
    };
  }

  makeManager() {
    const stockRepo = this.makeStockRepo();
    const ledgerRepo = this.makeLedgerRepo();
    return {
      getRepository: (entity: unknown) =>
        entity === StockItem ? stockRepo : ledgerRepo,
    };
  }
}

describe('InventoryService batch/lot tracking (PLAN.md step 1.6)', () => {
  let service: InventoryService;
  let db: FakeDb;

  beforeEach(async () => {
    db = new FakeDb();
    const manager = db.makeManager();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(StockItem),
          useValue: db.makeStockRepo(),
        },
        {
          provide: getRepositoryToken(StockLedger),
          useValue: db.makeLedgerRepo(),
        },
        {
          provide: DataSource,
          useValue: {
            transaction: (cb: (m: unknown) => unknown) => cb(manager),
          },
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('keeps a non-batch item to a single row, same as before batch tracking existed', async () => {
    await service.increaseStock(1, 10, 5, TEST_COMPANY_ID, {
      reference_type: 'grn_receipt',
    });
    await service.increaseStock(1, 10, 3, TEST_COMPANY_ID, {
      reference_type: 'grn_receipt',
    });

    expect(db.stockRows.size).toBe(1);
    const row = db.stockRows.get(key(1, 10, null));
    expect(Number(row?.quantity)).toBe(8);
    expect(row?.batch_no).toBeNull();
  });

  it('gives each distinct batch its own row for the same item/warehouse', async () => {
    await service.increaseStock(2, 10, 100, TEST_COMPANY_ID, {
      reference_type: 'grn_receipt',
      batch_no: 'BATCH-A',
      expiry_date: '2026-01-01',
    });
    await service.increaseStock(2, 10, 50, TEST_COMPANY_ID, {
      reference_type: 'grn_receipt',
      batch_no: 'BATCH-B',
      expiry_date: '2026-06-01',
    });

    expect(db.stockRows.size).toBe(2);
    expect(Number(db.stockRows.get(key(2, 10, 'BATCH-A'))?.quantity)).toBe(100);
    expect(Number(db.stockRows.get(key(2, 10, 'BATCH-B'))?.quantity)).toBe(50);
  });

  it('decreaseStock targets exactly the batch given, leaving others untouched', async () => {
    await service.increaseStock(2, 10, 100, TEST_COMPANY_ID, {
      batch_no: 'BATCH-A',
    });
    await service.increaseStock(2, 10, 50, TEST_COMPANY_ID, {
      batch_no: 'BATCH-B',
    });

    await service.decreaseStock(2, 10, 20, TEST_COMPANY_ID, {
      batch_no: 'BATCH-A',
    });

    expect(Number(db.stockRows.get(key(2, 10, 'BATCH-A'))?.quantity)).toBe(80);
    expect(Number(db.stockRows.get(key(2, 10, 'BATCH-B'))?.quantity)).toBe(50);
  });

  it('decreaseStockFefo consumes the earliest-expiring batch first', async () => {
    await service.increaseStock(3, 10, 30, TEST_COMPANY_ID, {
      batch_no: 'LATER',
      expiry_date: '2026-12-01',
    });
    await service.increaseStock(3, 10, 20, TEST_COMPANY_ID, {
      batch_no: 'EARLIER',
      expiry_date: '2026-01-01',
    });

    const result = await service.decreaseStockFefo(3, 10, 15, TEST_COMPANY_ID);

    expect(result.consumed).toEqual([{ batch_no: 'EARLIER', qty: 15 }]);
    expect(Number(db.stockRows.get(key(3, 10, 'EARLIER'))?.quantity)).toBe(5);
    expect(Number(db.stockRows.get(key(3, 10, 'LATER'))?.quantity)).toBe(30);
  });

  it('decreaseStockFefo spans multiple batches when one alone is not enough', async () => {
    await service.increaseStock(4, 10, 10, TEST_COMPANY_ID, {
      batch_no: 'EARLIER',
      expiry_date: '2026-01-01',
    });
    await service.increaseStock(4, 10, 30, TEST_COMPANY_ID, {
      batch_no: 'LATER',
      expiry_date: '2026-06-01',
    });

    const result = await service.decreaseStockFefo(4, 10, 25, TEST_COMPANY_ID);

    expect(result.consumed).toEqual([
      { batch_no: 'EARLIER', qty: 10 },
      { batch_no: 'LATER', qty: 15 },
    ]);
    expect(Number(db.stockRows.get(key(4, 10, 'EARLIER'))?.quantity)).toBe(0);
    expect(Number(db.stockRows.get(key(4, 10, 'LATER'))?.quantity)).toBe(15);
  });

  it('decreaseStockFefo fails clean (no partial consumption reported) when total stock is short', async () => {
    await service.increaseStock(5, 10, 5, TEST_COMPANY_ID, {
      batch_no: 'ONLY',
      expiry_date: '2026-01-01',
    });

    await expect(
      service.decreaseStockFefo(5, 10, 50, TEST_COMPANY_ID),
    ).rejects.toThrow(BadRequestException);
  });

  it('checkAvailabilityAcrossBatches sums every batch, not just one', async () => {
    await service.increaseStock(6, 10, 10, TEST_COMPANY_ID, { batch_no: 'A' });
    await service.increaseStock(6, 10, 10, TEST_COMPANY_ID, { batch_no: 'B' });

    await expect(
      service.checkAvailabilityAcrossBatches(6, 10, 15, TEST_COMPANY_ID),
    ).resolves.toBe(true);
    await expect(
      service.checkAvailabilityAcrossBatches(6, 10, 25, TEST_COMPANY_ID),
    ).rejects.toThrow(BadRequestException);
  });
});
