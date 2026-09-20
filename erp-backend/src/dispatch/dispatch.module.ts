import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispatchOrder } from './dispatch.entity';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { ItemsModule } from '../items/items.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DispatchOrder]),
    ItemsModule,
    WarehousesModule,
    InventoryModule,
  ],
  providers: [DispatchService],
  controllers: [DispatchController],
  exports: [DispatchService],
})
export class DispatchModule {}
