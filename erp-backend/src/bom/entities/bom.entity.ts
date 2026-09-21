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
import { BomStatus } from '../enums/bom-status.enum';

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

  // PLAN.md step 1.5: draft -> pending_approval -> active, enforced by
  // BomService (see its transition methods) and a DB CHECK constraint
  // (migration AddBomApprovalWorkflow). `is_active` (below) only ever
  // becomes true as a side effect of approve() -- it's the separate,
  // pre-existing "which version is the current one" flag from step 1.3,
  // not the workflow state itself.
  @Column({ type: 'varchar', length: 30, default: BomStatus.DRAFT })
  status: BomStatus;

  // The finished good this BOM produces. Nullable so pre-existing BOM rows
  // (created before this column existed) don't break; new BOMs should set it.
  @Column({ type: 'int', nullable: true })
  fg_item_id: number | null;

  @Column({ type: 'varchar', length: 30, default: 'V1' })
  version: string;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @OneToMany(() => BomItem, (item) => item.bom, { cascade: true })
  items: BomItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
