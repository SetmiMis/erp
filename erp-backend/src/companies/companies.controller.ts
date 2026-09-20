// erp-backend/src/companies/companies.controller.ts
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  /**
   * POST /api/companies — public, same trust level as the old /auth/register.
   * Creates a Company and its first COMPANY_ADMIN user together; this is the
   * new "sign up" entry point (see CompaniesService.createWithAdmin).
   */
  // Audit fix #5 (AUDIT_REPORT.md §1.3/§1.7): 5 attempts/min per IP — this
  // endpoint creates a company *and* its first admin user's password in one
  // unauthenticated call, so it deserves the same limit as login/register.
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.createWithAdmin(dto);
  }

  // Below routes require auth; a user may only look at / edit their own
  // company unless they're SUPERADMIN (a platform-ops role — company
  // management is the one place Phase 1 allows a cross-company view; all
  // *business data* elsewhere stays strictly single-company, see
  // suppliers/items/etc. services).
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    this.assertOwnCompanyOrSuperadmin(req, id);
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompanyDto,
    @Req() req: any,
  ) {
    this.assertOwnCompanyOrSuperadmin(req, id);
    return this.companiesService.update(id, dto);
  }

  private assertOwnCompanyOrSuperadmin(req: any, targetCompanyId: number) {
    const { role, companyId } = req.user;
    if (role !== UserRole.SUPERADMIN && companyId !== targetCompanyId) {
      throw new ForbiddenException("Cannot access another company's record.");
    }
  }
}
