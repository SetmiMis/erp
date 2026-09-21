import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BomService } from './bom.service';
import { CreateBomDto } from './dto/create-bom.dto';
import { UpdateBomDto } from './dto/update-bom.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user.enum';
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
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.findOne(id, companyId);
  }

  @Get(':id/cost')
  getCostRollup(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.getCostRollup(id, companyId);
  }

  // Distinct path shape from GET /bom/:id/cost above (4 segments vs 3), so
  // there's no route-matching ambiguity between "a BOM id" and "item".
  @Get('item/:itemId/cost')
  getActiveCostForItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.getActiveCostForItem(itemId, companyId);
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
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.remove(id, companyId);
  }

  // PLAN.md step 1.5: draft -> pending_approval -> active. Submit has no
  // extra role gate (same access as create/update); approve/reject do --
  // the maker-checker split.
  @Patch(':id/submit')
  submit(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.submit(id, companyId);
  }

  @Patch(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  approve(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.approve(id, companyId);
  }

  @Patch(':id/reject')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  reject(
    @Param('id', ParseIntPipe) id: number,
    @CompanyId() companyId: number,
  ) {
    return this.bomService.reject(id, companyId);
  }
}
