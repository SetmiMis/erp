import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SuppliersService } from '../suppliers/suppliers.service';
import { ItemsService } from '../items/items.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { PurchaseOrdersService } from '../purchase-orders/purchase-orders.service';
import { GrnService } from '../grn/grn.service';
import { DispatchService } from '../dispatch/dispatch.service';
import { FgrService } from '../fgr/fgr.service';
import { InventoryService } from '../inventory/inventory.service';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly itemsService: ItemsService,
    private readonly warehousesService: WarehousesService,
    private readonly purchaseOrdersService: PurchaseOrdersService,
    private readonly grnService: GrnService,
    private readonly dispatchService: DispatchService,
    private readonly fgrService: FgrService,
    private readonly inventoryService: InventoryService,
  ) {}

  @Get('summary')
  async getDashboardSummary(@CompanyId() companyId: number) {
    const [
      // Core Stats
      supplierCount,
      itemCount,
      warehouseCount,
      poCount,
      grnCount,
      dispatchCount,
      fgrCount,

      // Detailed Summaries
      poStatusSummary,
      recentPurchaseOrders,
      totalStockValue,
      lowStockItems,
    ] = await Promise.all([
      this.suppliersService.count(companyId),
      this.itemsService.count(companyId),
      this.warehousesService.count(companyId),
      this.purchaseOrdersService.count(companyId),
      this.grnService.count(companyId),
      this.dispatchService.count(companyId),
      this.fgrService.count(companyId),
      this.purchaseOrdersService.getStatusCounts(companyId),
      this.purchaseOrdersService.getRecent(companyId),
      this.inventoryService.getTotalStockValue(companyId),
      this.inventoryService.getLowStockItems(companyId),
    ]);

    return {
      stats: {
        suppliers: supplierCount,
        items: itemCount,
        warehouses: warehouseCount,
        purchase_orders: poCount,
        grn: grnCount,
        dispatch_orders: dispatchCount,
        fgr: fgrCount,
      },
      stockSummary: {
        totalValue: totalStockValue,
        lowStockItems: lowStockItems,
      },
      poStatusSummary: poStatusSummary,
      recentActivities: recentPurchaseOrders,
    };
  }
}
