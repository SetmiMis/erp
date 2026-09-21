import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Audit fix #1 (AUDIT_REPORT.md §3.1): `quality_check_items` was created by
 * a dead, unused pair of entity classes (src/quality-checks/quality-check.entity.ts
 * and quality-check-item.entity.ts, deleted alongside this migration) that
 * duplicated the real, live `QualityCheck`/`QCItem` entities under
 * src/quality-checks/entities/ — which map to `quality_checks`/`qc_items`.
 *
 * Nothing in the application ever read or wrote `quality_check_items`; it
 * was pure schema noise sitting alongside the real `qc_items` table. Since
 * TypeORM loads entities via a glob (see app.module.ts), the dead classes
 * were also silently registered in ORM metadata alongside the real
 * `QualityCheck` entity, both mapped to the same `quality_checks` table name.
 */
export class DropDeadQualityCheckItemsTable1786172699865
  implements MigrationInterface
{
  name = 'DropDeadQualityCheckItemsTable1786172699865';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "erp_test"."quality_check_items" DROP CONSTRAINT "FK_ac9ad5be8ae0e197d5a1bff9a8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."quality_check_items" DROP CONSTRAINT "FK_580d476ef191ec7c385d66171a5"`,
    );
    await queryRunner.query(`DROP TABLE "erp_test"."quality_check_items"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "erp_test"."quality_check_items" ("id" SERIAL NOT NULL, "received_qty" integer NOT NULL, "checked_qty" integer NOT NULL, "passed_qty" integer NOT NULL, "failed_qty" integer NOT NULL, "remarks" text, "qualityCheckId" integer, "itemId" integer, CONSTRAINT "PK_63fe2d89f2735b6d70f7a5ca753" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."quality_check_items" ADD CONSTRAINT "FK_580d476ef191ec7c385d66171a5" FOREIGN KEY ("qualityCheckId") REFERENCES "erp_test"."quality_checks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."quality_check_items" ADD CONSTRAINT "FK_ac9ad5be8ae0e197d5a1bff9a8b" FOREIGN KEY ("itemId") REFERENCES "erp_test"."items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
