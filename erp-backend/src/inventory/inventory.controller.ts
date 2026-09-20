import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
import { CompanyId } from '../common/decorators/company-id.decorator';

// Backs erp-frontend's current-stock / stock-ledger / stock-adjustment pages,
// which previously called nonexistent routes (see Phase 1 stabilization plan).
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get('current-stock')
  getCurrentStock(
    @CompanyId() companyId: number,
    @Query('search') search?: string,
    @Query('warehouse_id') warehouse_id?: string,
  ) {
    return this.service.getAllStockWithDetails(companyId, {
      search,
      warehouse_id: warehouse_id ? Number(warehouse_id) : undefined,
    });
  }

  @Get('ledger')
  getLedger(
    @CompanyId() companyId: number,
    @Query('search') search?: string,
    @Query('warehouse_id') warehouse_id?: string,
  ) {
    return this.service.getLedger(companyId, {
      search,
      warehouse_id: warehouse_id ? Number(warehouse_id) : undefined,
    });
  }

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Post('adjust')
  async adjust(@Body() dto: AdjustStockDto, @CompanyId() companyId: number) {
    const opts = {
      reference_type: 'manual_adjustment',
      remarks: dto.reason,
    };
    const result =
      dto.adjustment_type === 'IN'
        ? await this.service.increaseStock(dto.item_id, dto.warehouse_id, dto.qty, companyId, opts)
        : await this.service.decreaseStock(dto.item_id, dto.warehouse_id, dto.qty, companyId, opts);

    return {
      adjustment_number: `ADJ-${Date.now()}`,
      newQty: result.newQty,
    };
  }
}
