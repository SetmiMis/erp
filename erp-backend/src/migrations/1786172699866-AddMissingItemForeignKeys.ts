import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Audit fix #2 (AUDIT_REPORT.md §2.4): bom_items.item_id and
 * production_order_items.item_id were plain unconstrained integers — every
 * sibling line-item table (purchase_order_items, grn_items, qc_items) has an
 * FK from its item column to items.id, these two didn't. A deleted or
 * mistyped item id in a BOM or production order line currently inserts
 * successfully and only fails later, at read time, when the join to items
 * returns nothing.
 *
 * Uses ON DELETE RESTRICT (matching purchase_order_items' convention for an
 * item referenced from a document line) rather than CASCADE — deleting an
 * item should not silently delete BOM/production history.
 *
 * The BomItem/ProductionOrderItem TypeScript entities intentionally keep
 * item_id as a plain @Column (not a TypeORM relation) — their services
 * (bom.service.ts, production.service.ts) construct/read it as a raw
 * number throughout, and switching to a @ManyToOne would require reworking
 * those call sites. This migration only adds the DB-level constraint;
 * Postgres now rejects an invalid item_id even though the ORM doesn't
 * model the relation.
 */
export class AddMissingItemForeignKeys1786172699866 implements MigrationInterface {
  name = 'AddMissingItemForeignKeys1786172699866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_bom_items_item_id" ON "erp_test"."bom_items" ("item_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."bom_items" ADD CONSTRAINT "FK_bom_items_item_id" FOREIGN KEY ("item_id") REFERENCES "erp_test"."items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_production_order_items_item_id" ON "erp_test"."production_order_items" ("item_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."production_order_items" ADD CONSTRAINT "FK_production_order_items_item_id" FOREIGN KEY ("item_id") REFERENCES "erp_test"."items"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "erp_test"."production_order_items" DROP CONSTRAINT "FK_production_order_items_item_id"`,
    );
    await queryRunner.query(`DROP INDEX "erp_test"."IDX_production_order_items_item_id"`);

    await queryRunner.query(
      `ALTER TABLE "erp_test"."bom_items" DROP CONSTRAINT "FK_bom_items_item_id"`,
    );
    await queryRunner.query(`DROP INDEX "erp_test"."IDX_bom_items_item_id"`);
  }
}
