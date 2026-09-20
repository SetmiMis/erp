// erp-backend/src/auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { UserRole, UserStatus } from '../users/enums/user.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto): Promise<Omit<User, 'password_hash'>> {
    const { company_id, username, email, password, full_name } = payload;
    if (!password || password.trim().length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long.');
    }

    // 🛠️ Multi-company Phase 1: this endpoint used to bootstrap the very
    // first user in the whole DB as SUPERADMIN, because promoting anyone
    // else required already being an admin. Now that companies exist, that
    // bootstrap path is POST /api/companies (creates a Company + its first
    // COMPANY_ADMIN together) — this endpoint only ever joins an *existing*
    // company as a plain USER. findOne() throws NotFoundException if the
    // given company_id doesn't exist.
    await this.companiesService.findOne(company_id);

    const password_hash = await bcrypt.hash(password, 10);

    const createdUser = await this.usersService.create({
      company_id,
      username,
      email,
      password_hash,
      full_name,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      created_by: null,
      updated_by: null,
      refresh_token_hash: null,
      deleted_at: null,
    });
    return createdUser;
  }

  async validateUser(usernameOrEmail: string, pass: string): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.usersService.findOne(usernameOrEmail);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password_hash);
    if (!isMatch) return null;

    const { password_hash, ...result } = user;
    return result;
  }

  /**
   * 🔹 Login Method: Optimized for RBAC
   * JWT payload me permissions array nahi, sirf roleId rakha gaya hai.
   */
  async login(userPayload: Omit<User, 'password_hash'>) {
    // 1. Database se user ka role detail fetch karein (UsersService ka findById relations ke sath ready hai)
    const userWithRole = await this.usersService.findById(userPayload.id);
    
    // 2. Role ID safely extract karein (User entity me 'roleRelation' naam hai)
    const roleId = userWithRole?.roleRelation?.id || null;

    const accessTokenPayload = {
      sub: userPayload.id,
      username: userPayload.username,
      email: userPayload.email,
      roleId: roleId, // ❌ No massive permissions[] array here, purely ID
      type: 'access',
    };

    const refreshTokenPayload = {
      sub: userPayload.id,
      type: 'refresh',
    };

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, { expiresIn: '15m' });
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, { expiresIn: '7d' });

    // Save refresh token hash into DB
    await this.usersService.updateRefreshToken(userPayload.id, refreshToken);
    await this.usersService.updateLastLogin(userPayload.id);

    return {
      accessToken,
      refreshToken,
      user: {
        ...userPayload,
        roleRelation: userWithRole?.roleRelation || null, // Naya role structure return kar rahe hain
      },
    };
  }

  /**
   * 🔹 Optimized Refresh Logic
   */
  async refreshTokens(userId: number, refreshToken: string) {
    const isTokenValid = await this.usersService.validateRefreshToken(userId, refreshToken);
    if (!isTokenValid) {
      throw new UnauthorizedException('Access Denied - Invalid Refresh Token');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const accessTokenPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleRelation?.id || null, // 🚀 RBAC: Refresh token me bhi roleId sync rahega
      type: 'access',
    };

    const newAccessToken = await this.jwtService.signAsync(accessTokenPayload, { expiresIn: '15m' });
    return { accessToken: newAccessToken };
  }

  async logout(userId: number) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }
}