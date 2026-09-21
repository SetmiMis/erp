import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Warehouse } from '../../warehouses/warehouse.entity'; // adjust path per project
import { GrnItem } from './grn-item.entity';
import { PurchaseOrder } from '../../purchase-orders/purchase-order.entity';
import { Company } from '../../companies/company.entity';

export type GRNStatus = 'pending' | 'received' | 'closed' | 'cancelled';

// Multi-company Phase 1: grn_number uniqueness is now per-company (was
// global — see Multi-Company Architecture Audit §3).
@Entity('grns')
@Unique(['company_id', 'grn_number'])
export class Grn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ type: 'varchar', length: 50 })
  grn_number!: string;

  @Column({ type: 'date' })
  grn_date!: string;

  @ManyToOne(() => Warehouse, { eager: true })
  warehouse!: Warehouse;

  @ManyToOne(() => PurchaseOrder, { nullable: true })
  purchaseOrder?: PurchaseOrder;

  @Column({ type: 'varchar', length: 100, nullable: true })
  supplier_ref?: string;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status!: GRNStatus;

  @OneToMany(() => GrnItem, (item) => item.grn, { cascade: true, eager: true })
  items!: GrnItem[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
