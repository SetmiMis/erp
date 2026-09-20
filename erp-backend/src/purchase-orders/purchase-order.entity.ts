// erp-backend/src/purchase-orders/purchase-order.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Supplier } from '../suppliers/supplier.entity';
import { Warehouse } from '../warehouses/warehouse.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';
import { Company } from '../companies/company.entity';

// Multi-company Phase 1: po_number uniqueness is now per-company (was
// global — see Multi-Company Architecture Audit §3).
@Entity('purchase_orders')
@Unique(['company_id', 'po_number'])
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ length: 50 })
  po_number: string;

  @ManyToOne(() => Supplier, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => Warehouse, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @Column({ type: 'date' })
  order_date: Date;

  @Column({ type: 'date', nullable: true })
  expected_date?: Date;

  @Column({
    type: 'enum',
    enum: [
      'draft',
      'sent',
      'acknowledged',
      'partial',
      'completed',
      'cancelled',
    ],
    default: 'draft',
  })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_amount: number;

  @Column({ type: 'text', nullable: true })
  terms_and_conditions?: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder, {
    cascade: true, // This is crucial for saving/updating/deleting items with the PO
    eager: true, // Load items automatically when fetching a PO
  })
  items: PurchaseOrderItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
