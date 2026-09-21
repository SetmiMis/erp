import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Sahi path se import karein
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() dto: CreateLocationDto, @CompanyId() companyId: number) {
    return this.locationsService.create(dto, companyId);
  }

  // ✅ FIX: @Query() decorator add kiya gaya hai
  @Get()
  findAll(
    @Query() query: { status?: string; search?: string },
    @CompanyId() companyId: number,
  ) {
    return this.locationsService.findAll(query, companyId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.locationsService.findOne(id, companyId);
  }

  @Put(':id') // Note: Generally PATCH is preferred for updates
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLocationDto,
    @CompanyId() companyId: number,
  ) {
    return this.locationsService.update(id, dto, companyId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.locationsService.remove(id, companyId);
  }
}
