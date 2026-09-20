import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FgrService } from './fgr.service';
import { FinishedGoodsReceipt } from './fgr.entity';
import { ItemsService } from '../items/items.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { InventoryService } from '../inventory/inventory.service';

// Regression test for the Phase 1 fix: FgrService.create() used to call
// this.stocksService['itemsService'].findByCode(...), a property that never
// existed on StocksService, crashing every FGR creation with a TypeError.
// It now resolves the item/warehouse directly and moves stock via InventoryService.
const TEST_COMPANY_ID = 1;

describe('FgrService', () => {
  let service: FgrService;
  let itemsService: { findByCode: jest.Mock };
  let warehousesService: { findByName: jest.Mock };
  let inventoryService: { increaseStock: jest.Mock };

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
    inventoryService = { increaseStock: jest.fn().mockResolvedValue({ newQty: 15 }) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FgrService,
        { provide: getRepositoryToken(FinishedGoodsReceipt), useValue: {} },
        { provide: ItemsService, useValue: itemsService },
        { provide: WarehousesService, useValue: warehousesService },
        { provide: InventoryService, useValue: inventoryService },
        {
          provide: DataSource,
          useValue: { createQueryRunner: () => mockQueryRunner },
        },
      ],
    }).compile();

    service = module.get<FgrService>(FgrService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('resolves item/warehouse and increases stock via InventoryService (no crash)', async () => {
    itemsService.findByCode.mockResolvedValue({ id: 30, sku: 'FG-001' });
    warehousesService.findByName.mockResolvedValue({ id: 40, name: 'FG Store' });

    const dto = {
      receipt_number: 'FGR-001',
      production_order_no: 'PROD-001',
      item_code: 'FG-001',
      item_name: 'Widget',
      quantity: 10,
      uom: 'PCS',
      warehouse_name: 'FG Store',
      receipt_date: '2026-01-01',
    } as any;

    const result = await service.create(dto, TEST_COMPANY_ID);

    expect(itemsService.findByCode).toHaveBeenCalledWith('FG-001', TEST_COMPANY_ID);
    expect(warehousesService.findByName).toHaveBeenCalledWith('FG Store', TEST_COMPANY_ID);
    expect(inventoryService.increaseStock).toHaveBeenCalledWith(
      30,
      40,
      10,
      TEST_COMPANY_ID,
      expect.objectContaining({ reference_type: 'fgr_receipt', queryRunner: mockQueryRunner }),
    );
    expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
