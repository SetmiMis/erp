import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from '../companies/company.entity';

// company_id is redundant with item_id/warehouse_id (both already belong to
// exactly one company) but kept directly on this row per Multi-Company
// Architecture Audit §6 — lets every stock query filter without a join.
//
// PLAN.md step 1.6: batch_no/expiry_date are nullable and opt-in per item
// (Item.batch_tracked) -- an untracked item's row always has batch_no null,
// same as every row before this column existed. The old UNIQUE(item_id,
// warehouse_id) is replaced (migration AddBatchLotTracking) by a unique
// index on (item_id, warehouse_id, COALESCE(batch_no, '')): a plain item
// still gets exactly one row per warehouse (batch_no collapses to the same
// '' for every row, so a second one still collides), while a batch-tracked
// item gets one row per distinct batch instead. TypeORM's @Unique decorator
// can't express the COALESCE, so that constraint only exists in the
// migration, not mirrored here.
@Entity({ name: 'stock_items' })
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

  @Column({ type: 'varchar', length: 100, nullable: true })
  batch_no: string | null;

  @Column({ type: 'date', nullable: true })
  expiry_date: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
