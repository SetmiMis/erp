import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { ItemsModule } from '../items/items.module';
import { PurchaseOrdersModule } from '../purchase-orders/purchase-orders.module';
import { GrnModule } from '../grn/grn.module';
import { DispatchModule } from '../dispatch/dispatch.module';
import { FgrModule } from '../fgr/fgr.module';
import { InventoryModule } from '../inventory/inventory.module'; // 👈 Consolidated stock source (see Phase 1 plan)
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SuppliersModule,
    WarehousesModule,
    ItemsModule,
    PurchaseOrdersModule,
    GrnModule,
    DispatchModule,
    FgrModule,
    InventoryModule,
    AuthModule,
  ],
  controllers: [DashboardController],
})
export class DashboardModule {}
