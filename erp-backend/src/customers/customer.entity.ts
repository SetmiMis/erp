import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Company } from '../companies/company.entity';

// Mirrors erp-backend/src/suppliers/supplier.entity.ts (same conventions:
// soft delete, auto-generated code, active flag) with customer-specific
// fields (billing/shipping address split, credit terms) added on top.
// Multi-company Phase 1: customer_code/email uniqueness is now per-company
// (was global — see Multi-Company Architecture Audit §8).
@Entity('customers')
@Unique(['company_id', 'customer_code'])
@Unique(['company_id', 'email'])
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ type: 'varchar', length: 100, nullable: true })
  customer_code!: string | null;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  contact_person!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gst_number?: string;

  @Column({ type: 'text', nullable: true })
  billing_address?: string;

  @Column({ type: 'text', nullable: true })
  shipping_address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  pincode?: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  credit_limit!: number;

  // Free-form for now (e.g. "Net 30", "Due on Receipt") — matches how status
  // strings are handled elsewhere in this codebase rather than a fixed enum.
  @Column({ type: 'varchar', length: 50, default: 'Due on Receipt' })
  payment_terms!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
