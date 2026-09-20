import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionOrder } from './production-order.entity';
import { ProductionOrderItem } from './production-order-item.entity';
import { InventoryService } from '../inventory/inventory.service';

// Regression test for the Phase 1 fix: production.controller.ts's remove()
// used to validate the order existed and then return { success: true }
// without ever calling a delete — ProductionService had no remove() method
// at all. It now actually deletes draft/planned orders and blocks deletion
// once stock has moved (in_progress/completed).
const TEST_COMPANY_ID = 1;

describe('ProductionService.remove', () => {
  let service: ProductionService;
  let poRepo: { findOne: jest.Mock; delete: jest.Mock };
  let poItemRepo: { delete: jest.Mock };

  beforeEach(async () => {
    poRepo = { findOne: jest.fn(), delete: jest.fn() };
    poItemRepo = { delete: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionService,
        { provide: getRepositoryToken(ProductionOrder), useValue: poRepo },
        { provide: getRepositoryToken(ProductionOrderItem), useValue: poItemRepo },
        { provide: DataSource, useValue: {} },
        { provide: InventoryService, useValue: {} },
      ],
    }).compile();

    service = module.get<ProductionService>(ProductionService);
  });

  it('deletes a draft order', async () => {
    poRepo.findOne.mockResolvedValue({ id: 1, status: 'draft' });

    await service.remove(1, TEST_COMPANY_ID);

    expect(poItemRepo.delete).toHaveBeenCalledWith({ production_order_id: 1 });
    expect(poRepo.delete).toHaveBeenCalledWith({ id: 1, company_id: TEST_COMPANY_ID });
  });

  it('rejects deleting an in_progress order', async () => {
    poRepo.findOne.mockResolvedValue({ id: 2, status: 'in_progress' });

    await expect(service.remove(2, TEST_COMPANY_ID)).rejects.toThrow(BadRequestException);
    expect(poRepo.delete).not.toHaveBeenCalled();
  });

  it('rejects deleting a completed order', async () => {
    poRepo.findOne.mockResolvedValue({ id: 3, status: 'completed' });

    await expect(service.remove(3, TEST_COMPANY_ID)).rejects.toThrow(BadRequestException);
    expect(poRepo.delete).not.toHaveBeenCalled();
  });
});
