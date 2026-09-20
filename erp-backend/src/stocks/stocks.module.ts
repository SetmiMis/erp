// ⚠️ DEPRECATED (Phase 1 stabilization): this module's `Stock` entity/table was a
// second, non-reconciling stock ledger that duplicated `inventory` (StockItem/StockLedger).
// GRN, Dispatch, FGR, Dashboard and Reports have all been migrated onto
// `InventoryService` (see erp-backend/src/inventory/). This module is left registered
// (still exposes GET /stocks) only for backward compatibility; do not write new code
// against it. Retiring the entity/table outright is tracked as Phase 2 follow-up.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock } from './stock.entity';
import { Item } from '../items/item.entity'; // ✅ Import Item entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock, Item]), // ✅ Include both entities
  ],
  providers: [StocksService],
  controllers: [StocksController],
  exports: [StocksService], // Optional: export for Dashboard or other modules
})
export class StocksModule {}
