import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('stocks')
@UseGuards(JwtAuthGuard)
export class StocksController {
  constructor(private readonly service: StocksService) {}

  @Get()
  findAll(@CompanyId() companyId: number) {
    return this.service.findAll(companyId);
  }

  @Get('warehouse/:name')
  findByWarehouse(
    @Param('name') warehouse_name: string,
    @CompanyId() companyId: number,
  ) {
    return this.service.findByWarehouse(warehouse_name, companyId);
  }

  @Get(':item_id/:warehouse')
  findOne(
    @Param('item_id', ParseIntPipe) itemId: number,
    @Param('warehouse') warehouse: string,
    @CompanyId() companyId: number,
  ) {
    return this.service.findOne(itemId, warehouse, companyId);
  }
}
