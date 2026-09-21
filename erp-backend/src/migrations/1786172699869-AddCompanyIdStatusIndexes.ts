import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * PLAN.md step 1.2. Confirmed real query patterns before adding these
 * (not guessed): purchase_orders.service.ts's findAll() filters by
 * `{ company_id, status }` together (query.status merged into the same
 * where clause as company_id), and reports.service.ts does the same via
 * `po.status = :status` alongside its company_id filter. production_orders
 * and dispatch_orders follow the identical list/filter shape (a status
 * enum column, listed per company) even where a status-filtered query
 * isn't wired up in the UI yet -- same reasoning as AddCompanyIdIndexes
 * (1786172699867): cheap to add now, expensive sequential scan to
 * discover missing later once row counts grow.
 *
 * The existing plain (company_id) index from #1786172699867 doesn't help
 * `WHERE company_id = :x AND status = :y` as well as a composite would --
 * Postgres can use it for the company_id part but still has to scan every
 * matching row's status. Both indexes are kept (this one adds to, doesn't
 * replace, the plain one) since some queries here filter on company_id
 * alone.
 *
 * Schema-qualified to "erp_test" to match every other migration (see
 * PLAN.md step 0.16).
 */
export class AddCompanyIdStatusIndexes1786172699869
  implements MigrationInterface
{
  name = 'AddCompanyIdStatusIndexes1786172699869';

  private readonly tables = [
    'purchase_orders',
    'production_orders',
    'dispatch_orders',
  ];

  private indexName(table: string): string {
    return `IDX_${table}_company_id_status`;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of this.tables) {
      await queryRunner.query(
        `CREATE INDEX "${this.indexName(table)}" ON "erp_test"."${table}" ("company_id", "status")`,
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
