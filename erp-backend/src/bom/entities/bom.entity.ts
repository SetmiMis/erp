import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BomItem } from './bom-item.entity';
import { Company } from '../../companies/company.entity';

@Entity({ name: 'boms' })
export class Bom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ type: 'varchar', length: 150 })
  name: string; // finished good name or BOM name

  @Column({ type: 'varchar', length: 80, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 30, default: 'active' })
  status: string;

  // The finished good this BOM produces. Nullable so pre-existing BOM rows
  // (created before this column existed) don't break; new BOMs should set it.
  @Column({ type: 'int', nullable: true })
  fg_item_id: number | null;

  @Column({ type: 'varchar', length: 30, default: 'V1' })
  version: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => BomItem, (item) => item.bom, { cascade: true })
  items: BomItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
