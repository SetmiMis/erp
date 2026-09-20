import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ProductionOrderItem } from './production-order-item.entity';
import { Company } from '../companies/company.entity';

export type ProductionOrderStatus =
  | 'draft'
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

// Multi-company Phase 1: order_number uniqueness is now per-company (was
// global — see Multi-Company Architecture Audit §9).
@Entity({ name: 'production_orders' })
@Unique(['company_id', 'order_number'])
export class ProductionOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column()
  order_number: string;

  @Column()
  fg_item_id: number; // finished good item id

  @Column({ type: 'decimal', precision: 18, scale: 3, default: 0 })
  quantity: number;

  @Column({ nullable: true })
  warehouse_id: number;

  @Column({ type: 'varchar', length: 32, default: 'draft' })
  status: ProductionOrderStatus;

  @Column({ type: 'text', nullable: true })
  remarks: string | null;

  @OneToMany(() => ProductionOrderItem, (item) => item.productionOrder, {
    cascade: true,
    eager: true,
  })
  items: ProductionOrderItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
