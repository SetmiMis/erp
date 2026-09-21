import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * PLAN.md step 1.1: getLedger() paginates now instead of a hardcoded
 * LIMIT 500, ordering by (company_id, created_at DESC). The existing
 * per-column stock_ledger indexes (company_id alone, item_id+warehouse_id)
 * don't support that ordered-and-filtered scan efficiently -- this
 * composite index does.
 *
 * Schema-qualified to "erp_test" to match every other migration in this
 * project (see PLAN.md step 0.16 for the open question on whether that
 * should change -- not this migration's place to decide unilaterally and
 * be the one inconsistent one).
 */
export class AddStockLedgerCompanyCreatedAtIndex1786172699868
  implements MigrationInterface
{
  name = 'AddStockLedgerCompanyCreatedAtIndex1786172699868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_stock_ledger_company_id_created_at" ON "erp_test"."stock_ledger" ("company_id", "created_at")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "erp_test"."IDX_stock_ledger_company_id_created_at"`,
    );
  }
}
