import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { UserRole, UserStatus } from '../users/enums/user.enum';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: {
    create: jest.Mock;
    findOne: jest.Mock;
    updateLastLogin: jest.Mock;
  };
  let companiesService: { findOne: jest.Mock };

  beforeEach(async () => {
    usersService = {
      create: jest.fn().mockImplementation((payload) => Promise.resolve({ id: 1, ...payload })),
      findOne: jest.fn(),
      updateLastLogin: jest.fn(),
    };
    companiesService = {
      findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Acme Manufacturing' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: CompaniesService, useValue: companiesService },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Multi-company Phase 1: the old "first user in the whole DB becomes
  // SUPERADMIN" bootstrap is gone — that role now belongs to
  // CompaniesService.createWithAdmin (see companies.service.ts). This
  // endpoint only ever joins an *existing* company as a plain USER.
  describe('register()', () => {
    const basePayload = {
      company_id: 1,
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
      full_name: 'Regular User',
    };

    it('validates the given company_id exists before creating the user', async () => {
      await service.register(basePayload);

      expect(companiesService.findOne).toHaveBeenCalledWith(1);
    });

    it('always creates a plain USER, scoped to the given company', async () => {
      await service.register(basePayload);

      expect(usersService.create).toHaveBeenCalledWith(
        expect.objectContaining({ company_id: 1, role: UserRole.USER, status: UserStatus.ACTIVE }),
      );
    });

    it('propagates NotFoundException when the company does not exist', async () => {
      companiesService.findOne.mockRejectedValue(new NotFoundException('Company not found.'));

      await expect(service.register(basePayload)).rejects.toThrow(NotFoundException);
      expect(usersService.create).not.toHaveBeenCalled();
    });
  });
});
