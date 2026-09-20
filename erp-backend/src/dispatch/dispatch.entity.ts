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

// Multi-company Phase 1: dispatch_number uniqueness is now per-company (was
// global — see Multi-Company Architecture Audit §3).
@Entity('dispatch_orders')
@Unique(['company_id', 'dispatch_number'])
export class DispatchOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column()
  dispatch_number: string;

  @Column({ type: 'varchar', length: 255 })
  customer_name: string;

  @Column({ type: 'date' })
  dispatch_date: Date;

  @Column({
    type: 'enum',
    enum: ['draft', 'dispatched', 'delivered', 'cancelled'],
    default: 'draft',
  })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_value: number;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
