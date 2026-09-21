// erp-backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ItemsModule } from './items/items.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { GrnModule } from './grn/grn.module';
import { DispatchModule } from './dispatch/dispatch.module';
import { FgrModule } from './fgr/fgr.module';
import { BomModule } from './bom/bom.module';
import { ProductionModule } from './production/production.module';
import { StocksModule } from './stocks/stocks.module';
import { InventoryModule } from './inventory/inventory.module';
import { LocationsModule } from './locations/locations.module';
import { QualityCheckModule } from './quality-checks/quality-check.module';
import { ReportsModule } from './reports/reports.module';
import { SystemModule } from './system/system.module';
import { RolesModule } from './rbac/roles/roles.module';
import { CustomersModule } from './customers/customers.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    // Step 1: Configure ConfigModule to be global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Makes ConfigService available everywhere
    }),

    // Audit fix #5 (AUDIT_REPORT.md §1.3/§1.7): no rate limiting existed
    // anywhere, so /api/auth/login and the public /api/companies
    // self-registration endpoint were open to unlimited attempts. This is a
    // permissive global default (100 req/min per IP, applied to every route
    // via the APP_GUARD below); AuthController.login/register and
    // CompaniesController.create additionally carry a much tighter
    // route-level @Throttle() (see those files) since brute-forcing
    // credentials or spamming account creation is the actual risk.
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 100 }]),

    // Step 2: Configure TypeORM for the Supabase (PostgreSQL) connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbType = configService.get<string>('DB_TYPE') ?? 'postgres';

        // 🛠️ Multi-company Phase 1: synchronize is now OFF unconditionally.
        // Real TypeORM migrations exist from here on (see src/data-source.ts,
        // src/migrations/, and the migration:* npm scripts) — auto-sync would
        // fight them and cause schema drift. Dev workflow is now: pull code,
        // then `npm run migration:run` (also auto-applied on boot below via
        // migrationsRun, for convenience).
        const migrations = [__dirname + '/migrations/*{.ts,.js}'];
        const migrationsRun = true;

        // SQLite local/dev fallback
        if (dbType === 'sqlite') {
          return {
            type: 'sqlite',
            database:
              configService.get<string>('DB_DATABASE') ?? 'data/sqlite.db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations,
            migrationsRun,
            synchronize: false,
          } as TypeOrmModuleOptions;
        }

        // Postgres (Supabase) URL based configuration
        if (configService.get<string>('DATABASE_URL')) {
          return {
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            // Optional: point at an isolated Postgres schema (e.g.
            // DB_SCHEMA=erp_test) instead of "public" — see src/data-source.ts.
            schema: configService.get<string>('DB_SCHEMA') || undefined,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrations,
            migrationsRun,
            synchronize: false,
            ssl: configService.get<string>('DB_SSL') === 'true' || false,
            extra:
              configService.get<string>('DB_SSL') === 'true'
                ? { ssl: { rejectUnauthorized: false } }
                : undefined,
          } as TypeOrmModuleOptions;
        }

        // Standard Postgres configuration block
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
          username: configService.get<string>('DB_USERNAME') ?? 'postgres',
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE') ?? 'postgres',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations,
          migrationsRun,
          synchronize: false,
          ssl: configService.get<string>('DB_SSL') === 'true' || false,
          extra:
            configService.get<string>('DB_SSL') === 'true'
              ? { ssl: { rejectUnauthorized: false } }
              : undefined,
        };
      },
    }),

    // Step 3: Import all your application's feature modules
    AuthModule,
    UsersModule,
    SuppliersModule,
    DashboardModule,
    ItemsModule,
    WarehousesModule,
    PurchaseOrdersModule,
    GrnModule,
    DispatchModule,
    FgrModule,
    BomModule,
    ProductionModule,
    StocksModule,
    InventoryModule,
    LocationsModule,
    QualityCheckModule,
    // Previously built but never registered here — see Phase 1 stabilization plan.
    ReportsModule,
    SystemModule,
    RolesModule,
    CustomersModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Applies ThrottlerModule's limits to every route by default.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
