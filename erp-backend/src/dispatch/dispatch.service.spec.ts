import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DispatchService } from './dispatch.service';
import { DispatchOrder } from './dispatch.entity';
import { ItemsService } from '../items/items.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InventoryService } from '../inventory/inventory.service';

// Regression test for the Phase 1 fix: DispatchService.create() used to reach
// into StocksService for a nonexistent `itemsService` property
// ((this.stocksService as any).itemsService.findByCode(...)) and crash with a
// TypeError on every dispatch creation. It now resolves the item via
// ItemsService and moves stock via InventoryService directly.
const TEST_COMPANY_ID = 1;

describe('DispatchService', () => {
  let service: DispatchService;
  let itemsService: { findByCode: jest.Mock };
  let warehousesService: { findByName: jest.Mock };
  let inventoryService: {
    checkAvailability: jest.Mock;
    decreaseStock: jest.Mock;
  };

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      create: jest.fn((_entity, data) => ({ id: 1, ...data })),
      save: jest.fn((_entity, data) => Promise.resolve(data)),
    },
  };

  beforeEach(async () => {
    itemsService = { findByCode: jest.fn() };
    warehousesService = { findByName: jest.fn() };
    inventoryService = {
      checkAvailability: jest.fn().mockResolvedValue(true),
      decreaseStock: jest.fn().mockResolvedValue({ newQty: 5 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DispatchService,
        { provide: getRepositoryToken(DispatchOrder), useValue: {} },
        { provide: ItemsService, useValue: itemsService },
        { provide: WarehousesService, useValue: warehousesService },
        { provide: InventoryService, useValue: inventoryService },
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: () => mockQueryRunner,
          },
        },
      ],
    }).compile();

    service = module.get<DispatchService>(DispatchService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('resolves items via ItemsService and moves stock via InventoryService (no crash)', async () => {
    warehousesService.findByName.mockResolvedValue({ id: 10, name: 'Main WH' });
    itemsService.findByCode.mockResolvedValue({ id: 20, sku: 'ITEM-001' });

    const dto = {
      dispatch_number: 'DISP-001',
      customer_name: 'Acme',
      warehouse_name: 'Main WH',
      dispatch_date: '2026-01-01',
      items: [{ item_code: 'ITEM-001', dispatched_qty: 5 }],
    } as any;

    const result = await service.create(dto, TEST_COMPANY_ID);

    expect(warehousesService.findByName).toHaveBeenCalledWith('Main WH', TEST_COMPANY_ID);
    expect(itemsService.findByCode).toHaveBeenCalledWith('ITEM-001', TEST_COMPANY_ID);
    expect(inventoryService.checkAvailability).toHaveBeenCalledWith(20, 10, 5, TEST_COMPANY_ID, mockQueryRunner);
    expect(inventoryService.decreaseStock).toHaveBeenCalledWith(
      20,
      10,
      5,
      TEST_COMPANY_ID,
      expect.objectContaining({ reference_type: 'dispatch', queryRunner: mockQueryRunner }),
    );
    expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('rolls back the transaction if stock is insufficient', async () => {
    warehousesService.findByName.mockResolvedValue({ id: 10, name: 'Main WH' });
    itemsService.findByCode.mockResolvedValue({ id: 20, sku: 'ITEM-001' });
    inventoryService.checkAvailability.mockRejectedValue(new Error('Insufficient stock'));

    const dto = {
      dispatch_number: 'DISP-002',
      customer_name: 'Acme',
      warehouse_name: 'Main WH',
      dispatch_date: '2026-01-01',
      items: [{ item_code: 'ITEM-001', dispatched_qty: 999 }],
    } as any;

    await expect(service.create(dto, TEST_COMPANY_ID)).rejects.toThrow('Insufficient stock');
    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.release).toHaveBeenCalled();
  });
});
