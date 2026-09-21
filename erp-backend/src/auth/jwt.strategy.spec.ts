import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';

// Regression test for the highest-impact Phase 1 fix: JwtStrategy.validate()
// used to return req.user WITHOUT a `role` field, while RolesGuard
// (src/auth/guards/roles.guard.ts) checks `user.role` — meaning every
// @Roles(...)-gated route (items, suppliers, warehouses, grn, dispatch, fgr,
// bom, quality-checks, production-orders, purchase-orders, users, customers)
// rejected ALL users regardless of actual role. `role` must now be present
// on the object returned from validate() so RolesGuard can actually pass.
describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let usersService: { findOne: jest.Mock };

  beforeEach(async () => {
    usersService = { findOne: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('test-secret') },
        },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('includes the user role in the validated request user object', async () => {
    usersService.findOne.mockResolvedValue({
      id: 1,
      username: 'admin1',
      email: 'admin@example.com',
      role: 'COMPANY_ADMIN',
      roleRelation: { id: 5, permissions: [{ code: 'items.create' }] },
    });

    const result = await strategy.validate({
      sub: 1,
      username: 'admin1',
      email: 'admin@example.com',
      type: 'access',
    });

    // This is the field RolesGuard.canActivate() reads via
    // `requiredRoles.includes(user.role)` — it must be present and correct.
    expect(result.role).toBe('COMPANY_ADMIN');
    expect(result.roleId).toBe(5);
    expect(result.permissions).toEqual(['items.create']);
  });

  it('rejects a refresh-typed token presented as an access token', async () => {
    await expect(
      strategy.validate({
        sub: 1,
        username: 'a',
        email: 'a@b.com',
        type: 'refresh',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects when the user no longer exists', async () => {
    usersService.findOne.mockResolvedValue(undefined);

    await expect(
      strategy.validate({
        sub: 1,
        username: 'ghost',
        email: 'g@b.com',
        type: 'access',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
