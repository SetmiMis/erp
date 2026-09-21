// erp-backend/src/items/item.entity.ts (Corrected Code with purchase_rate)

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Company } from '../companies/company.entity';

// Multi-company Phase 1: SKU uniqueness is now per-company (was global — see
// Multi-Company Architecture Audit §6).
@Entity('items')
@Unique(['company_id', 'sku'])
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  // SKU: Unique index ठीक है।
  @Column({ type: 'varchar', length: 50, nullable: true })
  sku!: string | null;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name!: string;

  // --- यह नई लाइन जोड़ें (Add this new line) ---
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  purchase_rate!: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  reorder_level?: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  // PLAN.md step 1.6: opt-in per item. When true, GRN receipts require a
  // batch_no per line and dispatch can target a specific batch or fall back
  // to FEFO (see InventoryService/GrnService/DispatchService). Items that
  // never set this keep behaving exactly as before -- batch_no/expiry_date
  // on stock_items/stock_ledger stay null for them.
  @Column({ type: 'boolean', default: false })
  batch_tracked!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
