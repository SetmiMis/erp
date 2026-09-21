// erp-backend/src/auth/types/authenticated-request.ts
import { Request } from 'express';
import { UserRole } from '../../users/enums/user.enum';

/**
 * Shape JwtStrategy.validate() returns, which Passport then attaches as
 * `req.user` on every route behind JwtAuthGuard.
 */
export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  roleId: number | null;
  companyId: number;
  permissions: string[];
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

/** Shape RefreshStrategy.validate() attaches as `req.user` behind jwt-refresh guard. */
export interface RefreshAuthenticatedRequest extends Request {
  user: { id: number; refreshToken: string };
}
