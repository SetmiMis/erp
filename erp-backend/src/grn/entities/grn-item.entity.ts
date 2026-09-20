import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Grn } from './grn.entity';
import { Item } from '../../items/item.entity';

@Entity('grn_items')
export class GrnItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Grn, (grn) => grn.items, { onDelete: 'CASCADE' })
  grn!: Grn;

  @ManyToOne(() => Item, { eager: true })
  @Index()
  item!: Item;

  @Column({ type: 'int' })
  received_qty!: number;

  @Column({ type: 'int', default: 0 })
  qc_checked_qty!: number; // updated when QC performed

  @Column({ type: 'varchar', length: 255, nullable: true })
  remarks?: string;
}
