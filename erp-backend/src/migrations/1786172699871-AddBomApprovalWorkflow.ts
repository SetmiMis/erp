import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * PLAN.md step 1.5: BOM lifecycle now has three states enforced by
 * BomService's transition methods (create -> draft, submit -> pending
 * approval, approve/reject -> active/back to draft) -- this migration backs
 * that with a DB CHECK constraint so a direct write (or a bug) can't leave a
 * `status` value the application doesn't understand.
 *
 * `status` already existed as a free-form varchar defaulting to 'active',
 * and the frontend was separately sending 'active'/'inactive' for a
 * different, unrelated "is this row active" toggle (now replaced by the
 * approval flow -- see erp-frontend's BOM pages). Existing rows are
 * normalized before the constraint is added: anything already flagged
 * `is_active` becomes 'active' (it's already live), everything else becomes
 * 'draft' (safe default -- nothing else in this 3-state model matches
 * mid-flight "pending approval", since that state didn't exist before this
 * migration).
 *
 * `is_active`'s default also moves from true to false to match: a BOM only
 * becomes the active version as a side effect of approve() now, not at
 * creation.
 *
 * Schema-qualified to "erp_test" to match every other migration (PLAN.md
 * step 0.16).
 */
export class AddBomApprovalWorkflow1786172699871 implements MigrationInterface {
  name = 'AddBomApprovalWorkflow1786172699871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "erp_test"."boms" SET "status" = 'active' WHERE "is_active" = true AND "status" NOT IN ('draft', 'pending_approval', 'active')`,
    );
    await queryRunner.query(
      `UPDATE "erp_test"."boms" SET "status" = 'draft' WHERE "is_active" = false AND "status" NOT IN ('draft', 'pending_approval', 'active')`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."boms" ALTER COLUMN "status" SET DEFAULT 'draft'`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."boms" ALTER COLUMN "is_active" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."boms" ADD CONSTRAINT "CHK_boms_status" CHECK ("status" IN ('draft', 'pending_approval', 'active'))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "erp_test"."boms" DROP CONSTRAINT "CHK_boms_status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."boms" ALTER COLUMN "is_active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "erp_test"."boms" ALTER COLUMN "status" SET DEFAULT 'active'`,
    );
    // Data normalization (draft/active backfill) is not reversed -- same as
    // every other migration's down() in this repo, lossy by nature.
  }
}
