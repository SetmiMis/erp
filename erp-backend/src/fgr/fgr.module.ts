import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedGoodsReceipt } from './fgr.entity';
import { FgrService } from './fgr.service';
import { FgrController } from './fgr.controller';

// ✅ Make sure these paths exactly match your folder/file structure
import { ItemsModule } from '../items/items.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinishedGoodsReceipt]),
    // ✅ Import the modules that provide the services/repositories you need
    ItemsModule,
    WarehousesModule,
    InventoryModule,
  ],
  providers: [FgrService],
  controllers: [FgrController],
  exports: [FgrService],
})
export class FgrModule {}
