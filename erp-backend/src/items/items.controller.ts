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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly service: ItemsService) {}

  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Post()
  create(
    @Body(new ValidationPipe({ transform: true })) dto: CreateItemDto,
    @CompanyId() companyId: number,
  ) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true }))
    query: {
      search?: string;
      status?: string;
      limit?: string;
      offset?: string;
    },
    @CompanyId() companyId: number,
  ) {
    const params = {
      search: query.search,
      status: query.status,
      limit: query.limit ? Number(query.limit) : undefined,
      offset: query.offset ? Number(query.offset) : undefined,
    };
    return this.service.findAll(companyId, params);
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
    @Body() dto: UpdateItemDto,
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
