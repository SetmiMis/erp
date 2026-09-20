// erp-backend/src/companies/companies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UsersService } from '../users/users.service';
import { UserRole, UserStatus } from '../users/enums/user.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Creates a Company and its first COMPANY_ADMIN user atomically — this is
   * the bootstrap path that replaces the old "first user in the whole DB
   * becomes SUPERADMIN" hack in AuthService.register(). If the admin user
   * insert fails (e.g. duplicate email), the Company insert is rolled back
   * too, so we never end up with an orphaned company that has no admin.
   */
  async createWithAdmin(
    dto: CreateCompanyDto,
  ): Promise<{ company: Company; admin: Omit<User, 'password_hash'> }> {
    return this.dataSource.transaction(async (manager) => {
      const companyRepo = manager.getRepository(Company);
      const company = companyRepo.create({
        name: dto.name,
        legal_name: dto.legal_name,
        gstin: dto.gstin,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        country: dto.country,
        is_active: true,
      });
      const savedCompany = await companyRepo.save(company);

      const password_hash = await bcrypt.hash(dto.admin_password, 10);
      const admin = await this.usersService.create(
        {
          company_id: savedCompany.id,
          username: dto.admin_username,
          email: dto.admin_email,
          password_hash,
          full_name: dto.admin_name,
          role: UserRole.COMPANY_ADMIN,
          status: UserStatus.ACTIVE,
          created_by: null,
          updated_by: null,
          refresh_token_hash: null,
          deleted_at: null,
        },
        manager,
      );

      return { company: savedCompany, admin };
    });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.repo.findOne({ where: { id } });
    if (!company) throw new NotFoundException('Company not found.');
    return company;
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    const existing = await this.findOne(id);
    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
