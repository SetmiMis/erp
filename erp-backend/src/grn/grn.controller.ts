import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GrnService } from './grn.service';
import { CreateGrnDto } from './dto/create-grn.dto';
import { UpdateGrnDto } from './dto/update-grn.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('grn')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GrnController {
  constructor(private readonly service: GrnService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Post()
  create(
    @Body(new ValidationPipe({ transform: true })) dto: CreateGrnDto,
    @CompanyId() companyId: number,
  ) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(
    @Query() query: { status?: string; search?: string },
    @CompanyId() companyId: number,
  ) {
    return this.service.findAll(query, companyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.service.findOne(id, companyId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGrnDto,
    @CompanyId() companyId: number,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.service.remove(id, companyId);
  }
}
