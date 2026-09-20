import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../purchase-orders/purchase-order.entity';
import { Grn } from '../grn/entities/grn.entity';
import { DispatchOrder } from '../dispatch/dispatch.entity';
import { InventoryService, StockDetailRow } from '../inventory/inventory.service';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';

// Define a common interface for filters
export interface ReportFilters {
  status?: string;
  supplierId?: number;
  customer?: string;
  from?: Date;
  to?: Date;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(PurchaseOrder) private poRepo: Repository<PurchaseOrder>,
    @InjectRepository(Grn) private grnRepo: Repository<Grn>,
    @InjectRepository(DispatchOrder)
    private dispatchRepo: Repository<DispatchOrder>,
    private inventoryService: InventoryService,
  ) {}

  // --- Data Fetching Methods with Advanced Filtering ---
  // Multi-company Phase 1: every query starts from a company_id andWhere —
  // see Multi-Company Architecture Audit §10 (reports were fully global).

  async getPurchaseReport(filters: ReportFilters, companyId: number): Promise<PurchaseOrder[]> {
    const query = this.poRepo
      .createQueryBuilder('po')
      .leftJoinAndSelect('po.supplier', 'supplier')
      .where('po.company_id = :companyId', { companyId });

    if (filters.status) {
      query.andWhere('po.status = :status', { status: filters.status });
    }
    if (filters.supplierId) {
      query.andWhere('po.supplierId = :supplierId', {
        supplierId: filters.supplierId,
      });
    }
    if (filters.from && filters.to) {
      query.andWhere('po.order_date BETWEEN :from AND :to', {
        from: filters.from,
        to: filters.to,
      });
    }

    return query.orderBy('po.order_date', 'DESC').getMany();
  }

  async getGrnReport(filters: ReportFilters, companyId: number): Promise<Grn[]> {
    const query = this.grnRepo
      .createQueryBuilder('grn')
      .leftJoinAndSelect('grn.purchaseOrder', 'po')
      .where('grn.company_id = :companyId', { companyId });

    if (filters.from && filters.to) {
      query.andWhere('grn.received_date BETWEEN :from AND :to', {
        from: filters.from,
        to: filters.to,
      });
    }
    // You can add more filters here, e.g., by supplier on the joined PO
    if (filters.supplierId) {
      query.andWhere('po.supplierId = :supplierId', {
        supplierId: filters.supplierId,
      });
    }

    return query.orderBy('grn.received_date', 'DESC').getMany();
  }

  async getDispatchReport(filters: ReportFilters, companyId: number): Promise<DispatchOrder[]> {
    const query = this.dispatchRepo
      .createQueryBuilder('dispatch')
      .where('dispatch.company_id = :companyId', { companyId });

    if (filters.customer) {
      query.andWhere('dispatch.customer_name LIKE :customer', {
        customer: `%${filters.customer}%`,
      });
    }
    if (filters.from && filters.to) {
      query.andWhere('dispatch.dispatch_date BETWEEN :from AND :to', {
        from: filters.from,
        to: filters.to,
      });
    }

    return query.orderBy('dispatch.dispatch_date', 'DESC').getMany();
  }

  getStockReport(companyId: number): Promise<StockDetailRow[]> {
    return this.inventoryService.getAllStockWithDetails(companyId);
  }

  // --- Export Utility Methods (exportToExcel, exportToPdf) ---

  async exportToExcel(
    res: Response,
    data: any[],
    sheetName: string,
    columns: any[],
  ) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    worksheet.columns = columns;
    worksheet.addRows(data);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${sheetName.replace(/\s/g, '_')}.xlsx`,
    );
    await workbook.xlsx.write(res);
    res.end();
  }

  exportToPdf(
    res: Response,
    data: any[],
    title: string,
    columns: { header: string; key: string; width?: number }[],
  ) {
    const doc = new PDFDocument({
      margin: 30,
      size: 'A4',
      layout: 'landscape',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${title.replace(/\s/g, '_')}.pdf`,
    );
    doc.pipe(res);

    doc.fontSize(16).text(title, { align: 'center' });
    doc.moveDown(1.5);

    const tableTop = doc.y;
    doc.fontSize(10).font('Helvetica-Bold');
    columns.forEach((column, i) => {
      doc.text(column.header, doc.x + (i === 0 ? 0 : 5), tableTop, {
        width: column.width,
        continued: true,
      });
    });

    const headerBottom = doc.y + 15;
    doc
      .moveTo(doc.x, headerBottom)
      .lineTo(doc.page.width - doc.x, headerBottom)
      .stroke();

    doc.font('Helvetica');
    data.forEach((row) => {
      doc.moveDown(1);
      const rowY = doc.y;
      columns.forEach((column, i) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const value =
          (column.key.split('.') as any[]).reduce(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (acc, part) => acc && acc[part],
            row,
          ) ?? '';
        doc.text(String(value), doc.x + (i === 0 ? 0 : 5), rowY, {
          width: column.width,
          continued: true,
        });
      });
    });

    doc.end();
  }
}
