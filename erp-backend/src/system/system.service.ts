import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../suppliers/supplier.entity';
import { User } from '../users/entities/user.entity';
import { Warehouse } from '../warehouses/warehouse.entity';
import { Item } from '../items/item.entity';
// import { Location } from '../locations/location.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Warehouse)
    private warehousesRepository: Repository<Warehouse>,

    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  // Multi-company Phase 1: scoped by companyId — this previously returned
  // record counts across every company in the database (see Multi-Company
  // Architecture Audit §10).
  async getStatus(companyId: number) {
    try {
      // ✅ Check DB connection
      await this.usersRepository.query('SELECT 1');
      const dbStatus = true;

      // ✅ Stats
      const supplierCount = await this.suppliersRepository.count({ where: { company_id: companyId } });
      const userCount = await this.usersRepository.count({ where: { company_id: companyId } });
      const warehouseCount = await this.warehousesRepository.count({ where: { company_id: companyId } });
      const itemCount = await this.itemsRepository.count({ where: { company_id: companyId } });
      const locationCount = 0;

      return {
        dbStatus,
        stats: {
          suppliers: supplierCount,
          users: userCount,
          warehouses: warehouseCount,
          items: itemCount,
          locations: locationCount,
        },
      };
    } catch (err) {
      console.error('System status check failed:', err);
      return { dbStatus: false, stats: {} };
    }
  }
}
