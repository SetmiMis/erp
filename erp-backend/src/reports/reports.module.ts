// src/reports/reports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from '../purchase-orders/purchase-order.entity';
import { Grn } from '../grn/entities/grn.entity';
import { DispatchOrder } from '../dispatch/dispatch.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder, Grn, DispatchOrder]),
    InventoryModule,
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
