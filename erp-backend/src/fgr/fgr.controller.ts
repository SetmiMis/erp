import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FgrService } from './fgr.service';
import { CreateFgrDto } from './dto/create-fgr.dto';
import { UpdateFgrDto } from './dto/update-fgr.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('fgr')
@UseGuards(JwtAuthGuard)
export class FgrController {
  constructor(private readonly service: FgrService) {}

  @Post()
  create(@Body() dto: CreateFgrDto, @CompanyId() companyId: number) {
    return this.service.create(dto, companyId);
  }

  @Get()
  findAll(@CompanyId() companyId: number) {
    return this.service.findAll(companyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.service.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFgrDto,
    @CompanyId() companyId: number,
  ) {
    return this.service.update(id, dto, companyId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.service.remove(id, companyId);
  }
}
