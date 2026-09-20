import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Grn } from '../../grn/entities/grn.entity';
import { QCItem } from './qc-item.entity';
import { Company } from '../../companies/company.entity';

// Multi-company Phase 1: qc_number uniqueness is now per-company (was
// global — see Multi-Company Architecture Audit §3).
@Entity('quality_checks')
@Unique(['company_id', 'qc_number'])
export class QualityCheck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column()
  qc_number!: string;

  @Column({ type: 'date' })
  qc_date!: string;

  @ManyToOne(() => Grn, { eager: true })
  grn!: Grn;

  @Column()
  inspector!: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status!: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @OneToMany(() => QCItem, (item) => item.quality_check, {
    cascade: true,
    eager: true,
  })
  items!: QCItem[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
