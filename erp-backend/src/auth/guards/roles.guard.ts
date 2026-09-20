// src/auth/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException, // Isko import karein
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Controller ya handler par @Roles() decorator se zaroori roles nikaalo.
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2. Agar koi role zaroori nahi hai, toh access de do.
    // Yeh check isey aur mazboot banata hai (agar @Roles([]) use kiya gaya ho).
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3. Request object se 'user' ko nikaalo, jise JwtAuthGuard ne set kiya hoga.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();

    // 4. Agar 'user' object hi nahi hai, iska matlab user authenticated (login) hi nahi hai.
    // Isliye 401 Unauthorized error bhejo.
    if (!user) {
      throw new UnauthorizedException(
        'You must be logged in to access this resource.',
      );
    }

    // 5. Check karo ki user ka role zaroori roles ki list mein hai ya nahi.
    // .some() ka istemaal zyaada flexible hai agar user ke paas multiple roles ho.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    const hasPermission = requiredRoles.includes(user.role);

    if (!hasPermission) {
      // Agar user login hai lekin uske paas permission nahi hai, toh 403 Forbidden error bhejo.
      throw new ForbiddenException(
        `You do not have permission. Required role: ${requiredRoles.join(' or ')}`,
      );
    }

    // 6. Agar sab theek hai, toh access de do.
    return true;
  }
}
