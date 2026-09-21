import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user.enum';
import { CompanyId } from '../../common/decorators/company-id.decorator';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// 🛠️ Security fix (Multi-Company Architecture Audit §5/§11): this controller
// was guarded by JwtAuthGuard only — any authenticated user, including a
// freshly self-registered plain USER, could create/edit/delete roles and
// their permission assignments. Now consistent with users.controller.ts.
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Post()
  create(@Body() dto: CreateRoleDto, @CompanyId() companyId: number) {
    return this.rolesService.create(dto, companyId);
  }

  @Get()
  findAll(
    @CompanyId() companyId: number,
    @Query('search') search?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.rolesService.findAll(companyId, {
      search,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.rolesService.findOne(id, companyId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
    @CompanyId() companyId: number,
  ) {
    return this.rolesService.update(id, dto, companyId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.rolesService.remove(id, companyId);
  }

  @Get('count/all')
  count(@CompanyId() companyId: number) {
    return this.rolesService.count(companyId);
  }
}
