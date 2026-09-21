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
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ensureSchemaExists } from './database/ensure-schema';

dotenv.config();

const dbType = process.env.DB_TYPE ?? 'postgres';
const schema = process.env.DB_SCHEMA || undefined;
const ssl = process.env.DB_SSL === 'true';
const sslOptions = ssl ? { rejectUnauthorized: false } : undefined;

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
    // instead of "public" — this is where every migration is qualified to.
    // See PLAN.md step 0.16 and database/ensure-schema.ts.
    schema,
    ssl,
    extra: sslOptions ? { ssl: sslOptions } : undefined,
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
    schema,
    ssl,
    extra: sslOptions ? { ssl: sslOptions } : undefined,
  };
}

// TypeORM CLI requires the file to contain exactly one DataSource export.
export const AppDataSource = new DataSource(options);

// The CLI (migration:run et al.) calls AppDataSource.initialize() itself —
// there's no factory hook to run code before it the way app.module.ts's
// TypeOrmModule.forRootAsync has. Wrap initialize() so the schema exists
// before TypeORM tries to run migrations qualified to it (see
// database/ensure-schema.ts for why this is needed at all).
if (dbType !== 'sqlite' && schema) {
  const pgOptions = options as PostgresConnectionOptions;
  const originalInitialize = AppDataSource.initialize.bind(
    AppDataSource,
  ) as () => Promise<DataSource>;
  AppDataSource.initialize = async (): Promise<DataSource> => {
    await ensureSchemaExists(
      schema,
      pgOptions.url
        ? { connectionString: pgOptions.url, ssl: sslOptions }
        : {
            host: pgOptions.host,
            port: pgOptions.port,
            user: pgOptions.username,
            password: pgOptions.password,
            database: pgOptions.database,
            ssl: sslOptions,
          },
    );
    return originalInitialize();
  };
}
