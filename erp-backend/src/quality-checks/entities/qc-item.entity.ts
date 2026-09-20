import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QualityCheck } from './quality-check.entity';
import { GrnItem } from '../../grn/entities/grn-item.entity';
import { Item } from '../../items/item.entity';

@Entity('qc_items')
export class QCItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => QualityCheck, (qc) => qc.items, { onDelete: 'CASCADE' })
  quality_check!: QualityCheck;

  @ManyToOne(() => GrnItem, { eager: true })
  grn_item!: GrnItem;

  @ManyToOne(() => Item, { eager: true })
  item!: Item;

  @Column({ type: 'int' })
  checked_qty!: number;

  @Column({ type: 'int' })
  passed_qty!: number;

  @Column({ type: 'int' })
  failed_qty!: number;

  @Column({ type: 'text', nullable: true })
  remarks?: string;
}
