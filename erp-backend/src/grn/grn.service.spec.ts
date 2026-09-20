import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GrnService } from './grn.service';
import { Grn } from './entities/grn.entity';
import { GrnItem } from './entities/grn-item.entity';
import { Item } from '../items/item.entity';
import { Warehouse } from '../warehouses/warehouse.entity';
import { InventoryService } from '../inventory/inventory.service';

// Regression test for the Phase 1 fix: GRN.create() persisted the goods
// receipt but never updated warehouse stock at all — receiving never
// affected inventory. It now calls InventoryService.increaseStock() per
// line item inside the same transaction.
const TEST_COMPANY_ID = 1;

describe('GrnService', () => {
  let service: GrnService;
  let warehouseRepo: { findOne: jest.Mock };
  let itemRepo: { find: jest.Mock };
  let grnRepo: { findOne: jest.Mock; create: jest.Mock };
  let inventoryService: { increaseStock: jest.Mock };

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: jest.fn((entityOrList) =>
        Array.isArray(entityOrList) ? entityOrList : Promise.resolve({ id: 1, ...entityOrList }),
      ),
    },
  };

  beforeEach(async () => {
    warehouseRepo = { findOne: jest.fn().mockResolvedValue({ id: 10, name: 'Main WH' }) };
    itemRepo = {
      find: jest.fn().mockResolvedValue([{ id: 20, sku: 'ITEM-001' }]),
    };
    grnRepo = {
      findOne: jest
        .fn()
        .mockResolvedValue(null) // used by generateGrnNumber()
        .mockResolvedValueOnce(null),
      create: jest.fn((v) => v),
    } as any;
    inventoryService = { increaseStock: jest.fn().mockResolvedValue({ newQty: 25 }) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrnService,
        { provide: getRepositoryToken(Grn), useValue: grnRepo },
        { provide: getRepositoryToken(GrnItem), useValue: { create: jest.fn((v) => v) } },
        { provide: getRepositoryToken(Item), useValue: itemRepo },
        { provide: getRepositoryToken(Warehouse), useValue: warehouseRepo },
        { provide: InventoryService, useValue: inventoryService },
        {
          provide: DataSource,
          useValue: { createQueryRunner: () => mockQueryRunner },
        },
      ],
    }).compile();

    service = module.get<GrnService>(GrnService);
    jest.clearAllMocks();
    warehouseRepo.findOne.mockResolvedValue({ id: 10, name: 'Main WH' });
    itemRepo.find.mockResolvedValue([{ id: 20, sku: 'ITEM-001' }]);
    grnRepo.findOne.mockResolvedValue({ id: 1, grn_number: 'GRN-000001' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('increases stock via InventoryService for each received line item', async () => {
    const dto = {
      grn_date: '2026-01-01',
      warehouse_id: 10,
      items: [{ item_id: 20, received_qty: 50 }],
    } as any;

    await service.create(dto, TEST_COMPANY_ID);

    expect(inventoryService.increaseStock).toHaveBeenCalledWith(
      20,
      10,
      50,
      TEST_COMPANY_ID,
      expect.objectContaining({ reference_type: 'grn_receipt', queryRunner: mockQueryRunner }),
    );
    expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
  });
});
