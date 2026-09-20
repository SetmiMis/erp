// src/rbac/permissions/entities/permission.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  // Kis module ki permission hai (e.g., 'INVENTORY', 'USERS')
  @Column({ length: 100 })
  module: string;

  // Kya action ho raha hai (e.g., 'CREATE', 'READ', 'DELETE')
  @Column({ length: 100 })
  action: string;

  // Unique short code system validation ke liye (e.g., 'inventory:create')
  @Column({
    unique: true,
    length: 150,
  })
  code: string;

  @Column({
    nullable: true,
  })
  description?: string;

  // ManyToMany relation with Role
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}