import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductionOrder } from './production-order.entity';

@Entity({ name: 'production_order_items' })
export class ProductionOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductionOrder, (po) => po.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'production_order_id' })
  productionOrder: ProductionOrder;

  @Column()
  production_order_id: number;

  @Column()
  item_id: number; // raw material id (or component id)

  @Column({ type: 'decimal', precision: 18, scale: 3, default: 0 })
  required_qty: number;

  @Column({ type: 'decimal', precision: 18, scale: 3, default: 0 })
  issued_qty: number; // qty issued to production

  @Column({ type: 'text', nullable: true })
  remarks: string | null;
}
