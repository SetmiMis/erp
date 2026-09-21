import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * PLAN.md step 1.6: batch/lot tracking, opt-in per item.
 *
 * - `items.batch_tracked` (default false): whether this item is tracked by
 *   batch/lot at all. Every existing item defaults to false -- no behavior
 *   change until someone opts an item in.
 * - `stock_items.batch_no`/`expiry_date` (nullable): which batch a stock row
 *   represents. The old UNIQUE(item_id, warehouse_id) -- one row per item
 *   per warehouse -- is replaced with a unique index on (item_id,
 *   warehouse_id, COALESCE(batch_no, '')), so an untracked item (batch_no
 *   always null, collapsing to the same '') still gets exactly one row per
 *   warehouse, while a tracked item gets one row per distinct batch.
 * - `stock_ledger.batch_no`/`expiry_date` (nullable): which batch a
 *   movement was against, for traceability. No uniqueness needed -- it's an
 *   append-only ledger.
 * - `grn_items.batch_no`/`expiry_date` (nullable): the batch a GRN line
 *   receipt is creating/adding to. Required by GrnService.create() when the
 *   line's item is batch_tracked, otherwise ignored.
 *
 * Dispatch has no persisted line-items table to extend (DispatchService
 * only ever used its DTO's items transiently to move stock, see its
 * comments) -- a dispatch's batch selection (explicit or FEFO-picked) shows
 * up on the stock_ledger rows it creates instead.
 *
 * Schema-qualified to "erp_test" to match every other migration (PLAN.md
 * step 0.16).
 */
export class AddBatchLotTracking1786172699872 implements MigrationInterface {
  name = 'AddBatchLotTracking1786172699872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "erp_test"."items" ADD "batch_tracked" boolean NOT NULL DEFAULT false`,
    );

    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_items" ADD "batch_no" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_items" ADD "expiry_date" date`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_items" DROP CONSTRAINT "UQ_d03ea7f1c52df96038c91b7f8eb"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_stock_items_item_warehouse_batch" ON "erp_test"."stock_items" ("item_id", "warehouse_id", COALESCE("batch_no", ''))`,
    );

    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_ledger" ADD "batch_no" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_ledger" ADD "expiry_date" date`,
    );

    await queryRunner.query(
      `ALTER TABLE "erp_test"."grn_items" ADD "batch_no" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."grn_items" ADD "expiry_date" date`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "erp_test"."grn_items" DROP COLUMN "expiry_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."grn_items" DROP COLUMN "batch_no"`,
    );

    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_ledger" DROP COLUMN "expiry_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_ledger" DROP COLUMN "batch_no"`,
    );

    await queryRunner.query(
      `DROP INDEX "erp_test"."IDX_stock_items_item_warehouse_batch"`,
    );
    // Re-adding the original UNIQUE constraint only works if no batch-tracked
    // duplicate rows exist by now -- same caveat every other down() in this
    // repo has around lossy/irreversible data (see e.g.
    // AddBomApprovalWorkflow's down()).
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_items" ADD CONSTRAINT "UQ_d03ea7f1c52df96038c91b7f8eb" UNIQUE ("item_id", "warehouse_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_items" DROP COLUMN "expiry_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."stock_items" DROP COLUMN "batch_no"`,
    );

    await queryRunner.query(
      `ALTER TABLE "erp_test"."items" DROP COLUMN "batch_tracked"`,
    );
  }
}
