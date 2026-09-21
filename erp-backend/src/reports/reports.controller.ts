import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyId } from '../common/decorators/company-id.decorator';
import type { Response } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('purchase-orders')
  async getPurchaseReport(
    @Res() res: Response,
    @CompanyId() companyId: number,
    @Query('status') status?: string,
    @Query('supplierId') supplierId?: number,
    @Query('from') from?: Date,
    @Query('to') to?: Date,
    @Query('export') exportType?: string,
  ) {
    const filters = { status, supplierId, from, to };
    const data = await this.reportsService.getPurchaseReport(
      filters,
      companyId,
    );

    if (exportType) {
      const columns = [
        { header: 'PO Number', key: 'po_number', width: 20 },
        { header: 'Supplier', key: 'supplier.name', width: 25 },
        { header: 'Order Date', key: 'order_date', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        {
          header: 'Total',
          key: 'total_amount',
          width: 15,
          style: { numFmt: '#,##0.00' },
        },
      ];
      const title = 'Purchase Orders Report';
      const flattenedData = data.map((po) => ({
        ...po,
        'supplier.name': po.supplier?.name,
      }));

      if (exportType === 'excel') {
        return this.reportsService.exportToExcel(
          res,
          flattenedData,
          'Purchase_Orders',
          columns,
        );
      }
      if (exportType === 'pdf') {
        return this.reportsService.exportToPdf(
          res,
          data,
          title,
          columns.map((c) => ({ ...c, width: 110 })),
        );
      }
    }
    return res.json(data);
  }

  @Get('grn')
  async getGrnReport(
    @Res() res: Response,
    @CompanyId() companyId: number,
    @Query('supplierId') supplierId?: number,
    @Query('from') from?: Date,
    @Query('to') to?: Date,
    @Query('export') exportType?: string,
  ) {
    const filters = { supplierId, from, to };
    const data = await this.reportsService.getGrnReport(filters, companyId);

    if (exportType) {
      const columns = [
        { header: 'GRN Number', key: 'grn_number', width: 25 },
        { header: 'Received Date', key: 'received_date', width: 20 },
        { header: 'PO Number', key: 'purchaseOrder.po_number', width: 25 },
        { header: 'Remarks', key: 'remarks', width: 40 },
      ];
      const title = 'GRN Report';
      const flattenedData = data.map((grn) => ({
        ...grn,
        'purchaseOrder.po_number': grn.purchaseOrder?.po_number,
      }));

      if (exportType === 'excel') {
        return this.reportsService.exportToExcel(
          res,
          flattenedData,
          'GRN_Report',
          columns,
        );
      }
      if (exportType === 'pdf') {
        return this.reportsService.exportToPdf(
          res,
          data,
          title,
          columns.map((c) => ({ ...c, width: 150 })),
        );
      }
    }
    return res.json(data);
  }

  @Get('dispatch')
  async getDispatchReport(
    @Res() res: Response,
    @CompanyId() companyId: number,
    @Query('customer') customer?: string,
    @Query('from') from?: Date,
    @Query('to') to?: Date,
    @Query('export') exportType?: string,
  ) {
    const filters = { customer, from, to };
    const data = await this.reportsService.getDispatchReport(
      filters,
      companyId,
    );

    if (exportType) {
      const columns = [
        { header: 'Dispatch No.', key: 'dispatch_number', width: 20 },
        { header: 'Customer', key: 'customer_name', width: 30 },
        { header: 'Dispatch Date', key: 'dispatch_date', width: 20 },
        { header: 'Status', key: 'status', width: 20 },
      ];
      const title = 'Dispatch Report';

      if (exportType === 'excel') {
        return this.reportsService.exportToExcel(
          res,
          data,
          'Dispatch_Report',
          columns,
        );
      }
      if (exportType === 'pdf') {
        return this.reportsService.exportToPdf(
          res,
          data,
          title,
          columns.map((c) => ({ ...c, width: 150 })),
        );
      }
    }
    return res.json(data);
  }

  @Get('stock')
  async getStockReport(
    @Res() res: Response,
    @CompanyId() companyId: number,
    @Query('export') exportType?: string,
  ) {
    const data = await this.reportsService.getStockReport(companyId);

    if (exportType) {
      const columns = [
        { header: 'Item Code', key: 'item_code', width: 20 },
        { header: 'Item Name', key: 'item_name', width: 30 },
        { header: 'Warehouse', key: 'warehouse_name', width: 25 },
        {
          header: 'Quantity',
          key: 'quantity',
          width: 15,
          style: { numFmt: '#,##0.00' },
        },
        { header: 'UOM', key: 'uom', width: 15 },
      ];
      const title = 'Current Stock Report';

      if (exportType === 'excel') {
        return this.reportsService.exportToExcel(
          res,
          data,
          'Stock_Report',
          columns,
        );
      }
      if (exportType === 'pdf') {
        return this.reportsService.exportToPdf(
          res,
          data,
          title,
          columns.map((c) => ({ ...c, width: 120 })),
        );
      }
    }
    return res.json(data);
  }
}
