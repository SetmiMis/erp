import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grn } from './entities/grn.entity';
import { GrnItem } from './entities/grn-item.entity';
import { GrnService } from './grn.service';
import { GrnController } from './grn.controller';
import { Item } from '../items/item.entity';
import { Warehouse } from '../warehouses/warehouse.entity';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grn, GrnItem, Item, Warehouse]),
    InventoryModule,
  ],
  providers: [GrnService],
  controllers: [GrnController],
  exports: [GrnService],
})
export class GrnModule {}
