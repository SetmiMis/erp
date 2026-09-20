// erp-backend/src/rbac/guards/permissions.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator'; // Custom decorator key ka standard reference

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 🚀 Standard Reflector Layer: Handler (Method) and Class (Controller) override merge mapping
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Agar route par koi explicit permission demand nahi ki gayi hai, toh entry allow karein
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // ⚡ ZERO-DB CALL OVERHEAD: Strategy has already pre-populated this array live!

    if (!user) {
      throw new ForbiddenException('User session context not found or unauthorized.');
    }

    const userPermissions: string[] = user.permissions || [];

    // Check karein ki user ke paas saari required permissions array matching context me available hain ya nahi
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Access Denied - Insufficient structural access rights');
    }

    return true;
  }
}