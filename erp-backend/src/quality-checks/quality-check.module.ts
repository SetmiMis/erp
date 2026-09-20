import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityCheck } from './entities/quality-check.entity';
import { QCItem } from './entities/qc-item.entity';
import { QualityCheckService } from './qc.service';
import { QualityCheckController } from './qc.controller';
import { Grn } from '../grn/entities/grn.entity';
import { GrnItem } from '../grn/entities/grn-item.entity';
import { Item } from '../items/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QualityCheck, QCItem, Grn, GrnItem, Item]),
  ],
  providers: [QualityCheckService],
  controllers: [QualityCheckController],
  exports: [QualityCheckService],
})
export class QualityCheckModule {}
