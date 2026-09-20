import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { Supplier } from '../suppliers/supplier.entity';
import { User } from '../users/entities/user.entity';
import { Warehouse } from '../warehouses/warehouse.entity';
import { Item } from '../items/item.entity';
// import { Location } from '../locations/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, User, Warehouse, Item])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
