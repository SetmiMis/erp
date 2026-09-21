// erp-backend/src/database/ensure-schema.ts
//
// PLAN.md step 0.16: every migration in src/migrations/*.ts hardcodes its
// raw SQL to a specific Postgres schema (DB_SCHEMA -- "erp_test" in every
// environment today) instead of running unqualified against "public".
// Rewriting that already-shipped SQL isn't safe: the live Supabase
// dev/staging project backing the deployed Render backend already has all
// 6 migrations recorded as applied under erp_test, so this schema is
// staying -- it's the app's real, permanent schema now, not a scratch space.
//
// What *was* missing: that schema has to exist before migrationsRun (or the
// CLI's `migration:run`) executes, or every migration fails outright with
// `schema "<name>" does not exist`. Previously only docker-compose's
// (now-removed) init-schema.sql handled that, so booting against any other
// fresh Postgres (a new Supabase/Render project, CI, a developer's own local
// Postgres, a from-scratch `migration:run`) silently failed. This is called
// from both app.module.ts's TypeOrmModule.forRootAsync and data-source.ts
// (the CLI path) so schema creation is automatic everywhere the app
// connects to Postgres -- verified end-to-end against a bare, schema-less
// local Postgres via both paths.
import { Client, ClientConfig } from 'pg';

// Schema names here only ever come from DB_SCHEMA, operator-set config, not
// end-user input -- still validated as a plain identifier before it's
// interpolated into DDL, since `CREATE SCHEMA` can't be parameterized.
const VALID_SCHEMA_NAME = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

export async function ensureSchemaExists(
  schema: string | undefined,
  clientConfig: ClientConfig,
): Promise<void> {
  if (!schema) return;
  if (!VALID_SCHEMA_NAME.test(schema)) {
    throw new Error(
      `Invalid DB_SCHEMA "${schema}": must be a plain identifier (letters, digits, underscore).`,
    );
  }

  const client = new Client(clientConfig);
  await client.connect();
  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
  } finally {
    await client.end();
  }
}
