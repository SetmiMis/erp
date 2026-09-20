// erp-backend/src/users/users.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Ek naya user banata hai.
   *
   * `manager` is optional — pass a transactional EntityManager (see
   * CompaniesService.createWithAdmin, same opt-in-transaction pattern already
   * used by InventoryService's queryRunner param) when this must succeed or
   * fail atomically alongside another insert (e.g. creating a Company and its
   * first admin user together).
   */
  async create(
    payload: Omit<User, 'id' | 'last_login' | 'created_at' | 'updated_at'>,
    manager?: EntityManager,
  ): Promise<Omit<User, 'password_hash'>> {
    const repo = manager ? manager.getRepository(User) : this.usersRepository;

    const existing = await repo.findOne({
      where: [{ email: payload.email }, { username: payload.username }],
    });

    if (existing) {
      throw new ConflictException('Username or email already exists');
    }

    const newUser = repo.create(payload);
    const savedUser = await repo.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = savedUser;
    return result;
  }

  /**
   * User ko ID, username, ya email se dhoondhta hai sath me unka roleRelation aur permissions load karta hai.
   * Yeh function authentication ke liye zaroori hai.
   */
  async findOne(identifier: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: [{ username: identifier }, { email: identifier }],
      relations: ['roleRelation', 'roleRelation.permissions'], // 🚀 RBAC: Auth ke time roles aur unki permissions details sath aayengi
    });
    return user ?? undefined;
  }

  /**
   * User ko ID se dhoondhta hai (password hash ke bina).
   *
   * `companyId` is optional and deliberately so: internal trusted callers
   * (JwtStrategy re-hydrating req.user, AuthService.refreshTokens acting on
   * an already-validated refresh token's own userId) look up by primary key
   * alone. UsersController — where a COMPANY_ADMIN could otherwise guess
   * another company's numeric user id — always passes companyId to scope
   * the lookup (see Multi-Company Architecture Audit §11).
   */
  async findById(id: number, companyId?: number): Promise<Omit<User, 'password_hash'>> {
    const user = await this.usersRepository.findOne({
      where: companyId !== undefined ? { id, company_id: companyId } : { id },
      relations: ['roleRelation'], // 🚀 RBAC: User profile fetch karte waqt dynamic role metadata dikhega
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Sabhi users ki list deta hai jisme dynamic role table bhi loaded hogi.
   * Multi-company Phase 1: always scoped to one company (see Multi-Company
   * Architecture Audit §11 — this previously returned every user across
   * every company to any COMPANY_ADMIN).
   */
  async listAll(companyId: number): Promise<Omit<User, 'password_hash'>[]> {
    return this.usersRepository.find({
      where: { company_id: companyId },
      relations: ['roleRelation'], // 🚀 RBAC: ERP list me har bande ka actual mapped Role database se uth kar dikhega
      select: {
        id: true,
        email: true,
        username: true,
        full_name: true,
        role: true, // Temporary string role tracking keep active
        status: true,
        last_login: true,
        created_at: true,
        updated_at: true,
      }
    });
  }

  /**
   * User ka last login time update karta hai.
   */
  async updateLastLogin(id: number): Promise<void> {
    await this.usersRepository.update(id, { last_login: new Date() });
  }

  /**
   * User ko update karta hai (Dynamic DTO / Partial support ke sath).
   */
  async updateUser(id: number, updates: Partial<User>, companyId: number): Promise<any> {
    // Security check: Password update karne se rokein is function se
    delete (updates as any).password_hash;
    // Also never let a generic update move a user to a different company.
    delete (updates as any).company_id;
    const result = await this.usersRepository.update({ id, company_id: companyId }, updates);
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }

  /**
   * User ko delete karta hai (Hard delete ki jagah Soft Delete).
   */
  async deleteById(id: number, companyId: number): Promise<void> {
    const result = await this.usersRepository.softDelete({ id, company_id: companyId });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  /**
   * Total user count. Used by AuthService.register() to bootstrap the very
   * first registered user as an admin — otherwise nobody could ever create
   * an admin (promoting a user requires already being an admin).
   */
  async count(): Promise<number> {
    return this.usersRepository.count();
  }

  /**
   * 🔹 Refresh Token ko encrypt karke DB me save karta hai.
   * Code Hardening: Type casting (as any) ko clean kiya kyuki structure updated hai.
   */
  async updateRefreshToken(userId: number, refreshToken: string | null) {
    let hash = null;
    if (refreshToken) {
      hash = await bcrypt.hash(refreshToken, 10);
    }
    await this.usersRepository.update(userId, { refresh_token_hash: hash });
  }

  /**
   * 🔹 P0 - Refresh Token Match/Validate Logic
   * Code Hardening: Strict Type Safety implementations.
   */
  async validateRefreshToken(userId: number, refreshToken: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || !user.refresh_token_hash) {
      return false;
    }
    return bcrypt.compare(refreshToken, user.refresh_token_hash);
  }
}