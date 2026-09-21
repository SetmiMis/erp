// src/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '../enums/user.enum'; // 🛠️ Path Fix (Ek folder peeche)
import { Role } from '../../rbac/roles/entities/role.entity'; // 🛠️ Path Fix (Do folder peeche)
import { Company } from '../../companies/company.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // Tenant boundary (see Multi-Company Architecture Audit — Phase 1). Every
  // user belongs to exactly one company; username/email stay globally unique
  // by design (one-company-per-user model), not scoped per company.
  @Column()
  company_id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ type: 'varchar', default: UserRole.USER })
  role: UserRole;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({
    name: 'role_id',
  })
  roleRelation?: Role; // 👈 HAHAN PAR '?' LAGAYA HAI TAAKI REGISTRATION KA CODE NA TOOTE

  @Column({ type: 'varchar', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token_hash: string | null;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ nullable: true })
  created_by: number;

  @Column({ nullable: true })
  updated_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
