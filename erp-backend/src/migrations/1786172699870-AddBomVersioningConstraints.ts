import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * PLAN.md step 1.3: boms previously had a `version` column and an
 * `is_active` flag with nothing enforcing what those imply -- two BOMs for
 * the same finished item could both be `is_active = true` at once (which
 * one would a production order use?), and nothing stopped creating two
 * BOMs with the same version label for the same item.
 *
 * Two partial unique indexes (Postgres-specific; both `WHERE fg_item_id IS
 * NOT NULL` since fg_item_id is nullable for pre-existing rows -- see
 * bom.entity.ts's comment on that column):
 * - company_id + fg_item_id, WHERE is_active: at most one active BOM per
 *   finished item. This is the actual versioning guarantee -- multiple BOM
 *   rows (versions) can exist for the same item, exactly one active.
 * - company_id + fg_item_id + version: no two BOMs for the same item can
 *   claim the same version label.
 *
 * BomService.create()/update() (application-level) deactivate the
 * currently-active sibling before activating a new one, so these indexes
 * are a backstop against a bug or a direct DB write, not the primary
 * mechanism -- a naive two-step "deactivate old, activate new" without a
 * transaction could still race, which is exactly what a DB constraint
 * catches and the application code can't fully rule out on its own.
 *
 * Schema-qualified to "erp_test" to match every other migration (PLAN.md
 * step 0.16).
 */
export class AddBomVersioningConstraints1786172699870
  implements MigrationInterface
{
  name = 'AddBomVersioningConstraints1786172699870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_boms_company_fg_item_active" ON "erp_test"."boms" ("company_id", "fg_item_id") WHERE "is_active" = true AND "fg_item_id" IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_boms_company_fg_item_version" ON "erp_test"."boms" ("company_id", "fg_item_id", "version") WHERE "fg_item_id" IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "erp_test"."IDX_boms_company_fg_item_version"`,
    );
    await queryRunner.query(
      `DROP INDEX "erp_test"."IDX_boms_company_fg_item_active"`,
    );
  }
}
