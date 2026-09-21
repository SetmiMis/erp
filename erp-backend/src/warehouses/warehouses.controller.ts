import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('warehouses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarehousesController {
  constructor(private readonly service: WarehousesService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Post()
  create(@Body() dto: CreateWarehouseDto, @CompanyId() companyId: number) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: {
      status?: string;
      search?: string;
    },
    @CompanyId() companyId: number,
  ) {
    return this.service.findAll(companyId, query);
  }

  @Get('count')
  count(@CompanyId() companyId: number) {
    return this.service.count(companyId);
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
    @Body() dto: UpdateWarehouseDto,
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
