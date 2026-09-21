// src/rbac/roles/entities/role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  JoinColumn,
  Unique,
} from 'typeorm';

import { Permission } from '../../permissions/entities/permission.entity';
import { User } from '../../../users/entities/user.entity'; // 🛠️ Sahi Path Fix!
import { Company } from '../../../companies/company.entity';

// Multi-company Phase 1: company_id is nullable — NULL means a shared
// "system" role (is_system=true, usable by every company); a non-null value
// is one company's custom role. The composite unique below correctly scopes
// custom-role names per company; Postgres treats each NULL as distinct, so
// it does NOT by itself stop two *system* roles sharing a name — that case
// stays covered by RolesService's existing duplicate-name check.
@Entity('roles')
@Unique(['company_id', 'name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  company_id?: number | null;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company | null;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 255 })
  description?: string;

  @Column({ default: false })
  is_system: boolean;

  @OneToMany(() => User, (user) => user.roleRelation) // 🛠️ mapped to roleRelation
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: false,
  })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
