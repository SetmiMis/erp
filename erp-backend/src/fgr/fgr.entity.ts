import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Company } from '../companies/company.entity';

// Multi-company Phase 1: receipt_number uniqueness is now per-company (was
// global — same pattern as the other document-number fields, see
// Multi-Company Architecture Audit §3/§10).
@Entity('finished_goods_receipts')
@Unique(['company_id', 'receipt_number'])
export class FinishedGoodsReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column()
  receipt_number: string;

  @Column({ type: 'varchar', length: 255 })
  production_order_no: string;

  @Column({ type: 'varchar', length: 255 })
  item_name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  quantity: number;

  @Column({ type: 'varchar', length: 50 })
  uom: string;

  @Column({ type: 'varchar', length: 255 })
  warehouse_name: string;

  @Column({ type: 'date' })
  receipt_date: Date;

  @Column({
    type: 'enum',
    enum: ['draft', 'confirmed'],
    default: 'draft',
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
