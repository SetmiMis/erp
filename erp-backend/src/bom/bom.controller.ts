import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BomService } from './bom.service';
import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyId } from '../common/decorators/company-id.decorator';

@UseGuards(JwtAuthGuard) // Guard को यहाँ एक बार क्लास लेवल पर लगाएं
@Controller('bom')
export class BomController {
  constructor(private readonly bomService: BomService) {}

  @Post()
  create(@Body() createDto: CreateBomDto, @CompanyId() companyId: number) {
    return this.bomService.create(createDto, companyId);
  }

  @Get()
  findAll(@CompanyId() companyId: number) {
    return this.bomService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CompanyId() companyId: number) {
    return this.bomService.findOne(id, companyId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBomDto,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.update(id, updateDto, companyId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CompanyId() companyId: number) {
    return this.bomService.remove(id, companyId);
  }
}
