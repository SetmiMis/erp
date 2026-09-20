import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bom } from './bom.entity';

@Entity({ name: 'bom_items' })
export class BomItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bom, (bom) => bom.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bom_id' })
  bom: Bom;

  @Column()
  bom_id: number;

  @Column()
  item_id: number;

  @Column({ type: 'decimal', precision: 18, scale: 3, default: 0 })
  qty: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  uom: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;
}
