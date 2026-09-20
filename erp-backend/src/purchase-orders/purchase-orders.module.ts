// erp-backend/src/purchase-orders/purchase-orders.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './purchase-order.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity'; // ✅ CRITICAL: This was missing
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { Supplier } from '../suppliers/supplier.entity';
import { Item } from '../items/item.entity';
import { Warehouse } from '../warehouses/warehouse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      PurchaseOrderItem, // ✅ Added the item entity
      Supplier,
      Item,
      Warehouse,
    ]),
  ],
  providers: [PurchaseOrdersService],
  controllers: [PurchaseOrdersController],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
