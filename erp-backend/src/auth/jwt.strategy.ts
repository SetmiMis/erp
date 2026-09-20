// erp-backend/src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // 1. Request ke 'Authorization' header se Bearer Token ko nikaalo.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // 2. Expired tokens ko reject karo.
      ignoreExpiration: false,

      // 3. Token ko verify karne ke liye strict secret key check.
      secretOrKey: (() => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is required.');
        }
        return secret;
      })(),
    });
  }

  /**
   * Token successfully verify hone ke baad yeh function runtime par chalta hai.
   * Yeh database se Fresh Live Permissions load karke Express ke `req.user` me inject kar dega.
   */
  async validate(payload: { sub: number; username: string; email: string; type: string }) {
    // 🛡️ Security Check: Ensure standard access token block condition
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token type provided');
    }

    // 🚀 LIVE DATABASE SYNC: Fetch live user row along with active role permissions paths
    // identifier me string conversion bhej rahe hain kyunki findOne handle karta hai generic string queries
    const user = await this.usersService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException('User no longer exists inside the application context');
    }

    // 🛡️ Flattening permissions: Database nodes se identifiers ko array context ['inventory.view', 'user.create'] me convert kiya
    const permissions = user.roleRelation?.permissions?.map((p: any) => p.code || p.name) || [];

    // Yeh return object seedhe controllers me `req.user` (`@Req() req`) ke roop me automatically accessible ho jayega
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      // 🛠️ P0 fix: RolesGuard (src/auth/guards/roles.guard.ts) checks `user.role`.
      // It was missing here, so every @Roles(...)-gated route was rejecting all users.
      role: user.role,
      roleId: user.roleRelation?.id || null,
      // 🛠️ Multi-company Phase 1: tenant boundary, re-resolved fresh from the
      // DB on every request (same as role/permissions above) rather than
      // trusted from the signed JWT payload — read via the new @CompanyId()
      // decorator (src/common/decorators/company-id.decorator.ts) in
      // controllers, and required by every scoped service call.
      companyId: user.company_id,
      permissions: permissions, // 🚀 Real-time dynamic validation guard arrays injected!
    };
  }
}