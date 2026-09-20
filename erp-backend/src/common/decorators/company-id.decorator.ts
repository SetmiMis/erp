// erp-backend/src/common/decorators/company-id.decorator.ts
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

/**
 * Multi-company Phase 1 tenant boundary. Pulls the authenticated request's
 * companyId — populated by JwtStrategy.validate() (src/auth/jwt.strategy.ts)
 * the same way `role`/`permissions` already are — for use in every
 * company-scoped controller handler, e.g.:
 *
 *   findAll(@CompanyId() companyId: number, @Query() query) {
 *     return this.suppliersService.findAll(query, companyId);
 *   }
 *
 * Must be used behind JwtAuthGuard (so req.user exists); throws rather than
 * silently passing `undefined` through to a service's WHERE clause if that
 * invariant is ever violated.
 */
export const CompanyId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const companyId: number | undefined = request.user?.companyId;

    if (companyId === undefined || companyId === null) {
      throw new UnauthorizedException('Company context not found on request.');
    }

    return companyId;
  },
);
