import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../companies/company.entity';

// company_id is redundant with item_id/warehouse_id (both already belong to
// exactly one company) but kept directly on this row per Multi-Company
// Architecture Audit §6 — lets every stock query filter without a join.
@Entity({ name: 'stock_items' })
@Unique(['item_id', 'warehouse_id'])
export class StockItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column()
  item_id: number;

  @Column()
  warehouse_id: number;

  @Column({ type: 'decimal', precision: 18, scale: 3, default: 0 })
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
