import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Audit fix #3 (AUDIT_REPORT.md §2.3): every tenant-scoped service filters
 * its list/report queries with `WHERE company_id = :companyId` (see
 * items.service.ts, reports.service.ts, inventory.service.ts, etc.) but of
 * the 16 tables carrying company_id, only stock_ledger had an index that
 * actually supports that filter. The rest only had whatever incidental
 * index Postgres builds for a UNIQUE(company_id, other_col) constraint,
 * which doesn't help a plain `WHERE company_id = :x` scan.
 *
 * Invisible at today's row counts; becomes a sequential scan on every
 * list/dashboard/report query once volume approaches the V2 target
 * (100k+ orders, 1M+ inventory transactions).
 */
export class AddCompanyIdIndexes1786172699867 implements MigrationInterface {
  name = 'AddCompanyIdIndexes1786172699867';

  private readonly tables = [
    'warehouses',
    'suppliers',
    'items',
    'purchase_orders',
    'grns',
    'production_orders',
    'locations',
    'stock_items',
    'dispatch_orders',
    'finished_goods_receipts',
    'customers',
    'roles',
    'users',
    'boms',
    'stocks',
  ];

  private indexName(table: string): string {
    return `IDX_${table}_company_id`;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.query(
        `CREATE INDEX "${this.indexName(table)}" ON "erp_test"."${table}" ("company_id")`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of [...this.tables].reverse()) {
      await queryRunner.query(
        `DROP INDEX "erp_test"."${this.indexName(table)}"`,
      );
    }
  }
}
