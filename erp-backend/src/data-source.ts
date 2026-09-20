// erp-backend/src/data-source.ts
//
// CLI-usable DataSource for the TypeORM migration commands (migration:generate
// / migration:run / migration:revert — see package.json scripts). Mirrors the
// same Postgres/sqlite branching logic already in app.module.ts's
// TypeOrmModule.forRootAsync — kept as a separate plain DataSource because the
// TypeORM CLI runs outside Nest's DI container and can't consume a
// ConfigService-driven factory.
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const dbType = process.env.DB_TYPE ?? 'postgres';

const baseOptions = {
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  // Never auto-sync here — migrations are the only thing allowed to change
  // schema once this file is in play (see app.module.ts's shouldSynchronize).
  synchronize: false,
};

let options: DataSourceOptions;

if (dbType === 'sqlite') {
  options = {
    ...baseOptions,
    type: 'sqlite',
    database: process.env.DB_DATABASE ?? 'data/sqlite.db',
  };
} else if (process.env.DATABASE_URL) {
  options = {
    ...baseOptions,
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // Optional: point at an isolated Postgres schema (e.g. DB_SCHEMA=erp_test)
    // instead of "public" — used to verify migrations against real Postgres
    // without touching the live app's data. See Multi-Company Phase 1 plan.
    schema: process.env.DB_SCHEMA || undefined,
    ssl: process.env.DB_SSL === 'true' || false,
    extra:
      process.env.DB_SSL === 'true'
        ? { ssl: { rejectUnauthorized: false } }
        : undefined,
  };
} else {
  options = {
    ...baseOptions,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE ?? 'postgres',
    ssl: process.env.DB_SSL === 'true' || false,
    extra:
      process.env.DB_SSL === 'true'
        ? { ssl: { rejectUnauthorized: false } }
        : undefined,
  };
}

// TypeORM CLI requires the file to contain exactly one DataSource export.
export const AppDataSource = new DataSource(options);
