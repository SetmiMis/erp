import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BomService } from './bom.service';
import { Bom } from './entities/bom.entity';
import { BomItem } from './entities/bom-item.entity';
import { BomStatus } from './enums/bom-status.enum';

// Regression coverage for the Phase 1 fix: BomService.create() used to
// activate a new BOM immediately (is_active: true by default), bypassing
// any approval. It now always creates a draft, and only submit() -> approve()
// (role-gated at the controller) can turn a BOM active -- see PLAN.md step 1.5.
const TEST_COMPANY_ID = 1;

function makeBom(overrides: Partial<Bom> = {}): Bom {
  return {
    id: 1,
    company_id: TEST_COMPANY_ID,
    name: 'Chair',
    code: null,
    description: null,
    status: BomStatus.DRAFT,
    fg_item_id: 10,
    version: 'V1',
    is_active: false,
    items: [],
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  } as Bom;
}

describe('BomService', () => {
  let service: BomService;
  let bomRepo: { findOne: jest.Mock; save: jest.Mock };
  let updateQueryBuilder: {
    update: jest.Mock;
    set: jest.Mock;
    where: jest.Mock;
    andWhere: jest.Mock;
    execute: jest.Mock;
  };
  let transactionManager: {
    findOne: jest.Mock;
    save: jest.Mock;
    create: jest.Mock;
    merge: jest.Mock;
    delete: jest.Mock;
    createQueryBuilder: jest.Mock;
  };

  beforeEach(async () => {
    bomRepo = {
      findOne: jest.fn(),
      save: jest.fn((bom: Bom) => Promise.resolve(bom)),
    };

    updateQueryBuilder = {
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    };

    transactionManager = {
      findOne: jest.fn(),
      save: jest.fn((_entity: unknown, bom: Bom) => Promise.resolve(bom)),
      create: jest.fn((_entity: unknown, data: object) => data),
      merge: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(() => updateQueryBuilder),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BomService,
        { provide: getRepositoryToken(Bom), useValue: bomRepo },
        { provide: getRepositoryToken(BomItem), useValue: {} },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn((cb: (manager: unknown) => unknown) =>
              cb(transactionManager),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<BomService>(BomService);
  });

  describe('submit', () => {
    it('moves a draft BOM to pending_approval', async () => {
      bomRepo.findOne.mockResolvedValue(makeBom({ status: BomStatus.DRAFT }));

      const result = await service.submit(1, TEST_COMPANY_ID);

      expect(result.status).toBe(BomStatus.PENDING_APPROVAL);
      expect(bomRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: BomStatus.PENDING_APPROVAL }),
      );
    });

    it('rejects submitting a BOM that is not a draft', async () => {
      bomRepo.findOne.mockResolvedValue(makeBom({ status: BomStatus.ACTIVE }));

      await expect(service.submit(1, TEST_COMPANY_ID)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('approve', () => {
    it('activates a pending BOM and deactivates its sibling versions', async () => {
      transactionManager.findOne.mockResolvedValue(
        makeBom({ status: BomStatus.PENDING_APPROVAL, fg_item_id: 10 }),
      );

      const result = await service.approve(1, TEST_COMPANY_ID);

      expect(result.status).toBe(BomStatus.ACTIVE);
      expect(result.is_active).toBe(true);
      expect(updateQueryBuilder.set).toHaveBeenCalledWith({
        is_active: false,
      });
      expect(updateQueryBuilder.execute).toHaveBeenCalled();
    });

    it('rejects approving a BOM that is not pending approval', async () => {
      transactionManager.findOne.mockResolvedValue(
        makeBom({ status: BomStatus.DRAFT }),
      );

      await expect(service.approve(1, TEST_COMPANY_ID)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('reject', () => {
    it('sends a pending BOM back to draft', async () => {
      bomRepo.findOne.mockResolvedValue(
        makeBom({ status: BomStatus.PENDING_APPROVAL }),
      );

      const result = await service.reject(1, TEST_COMPANY_ID);

      expect(result.status).toBe(BomStatus.DRAFT);
    });

    it('rejects rejecting a BOM that is not pending approval', async () => {
      bomRepo.findOne.mockResolvedValue(makeBom({ status: BomStatus.DRAFT }));

      await expect(service.reject(1, TEST_COMPANY_ID)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('refuses to edit a BOM that has left draft', async () => {
      transactionManager.findOne.mockResolvedValue(
        makeBom({ status: BomStatus.PENDING_APPROVAL }),
      );

      await expect(
        service.update(1, { name: 'New name' }, TEST_COMPANY_ID),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('create', () => {
    it('always creates a new BOM as an inactive draft', async () => {
      transactionManager.save.mockImplementation((entity: unknown) => {
        if (entity && typeof entity === 'object' && 'id' in entity) {
          return Promise.resolve({ ...(entity as object), id: 1 });
        }
        return Promise.resolve(entity);
      });
      transactionManager.findOne.mockResolvedValue(
        makeBom({ status: BomStatus.DRAFT, is_active: false }),
      );

      await service.create(
        {
          name: 'Chair',
          fg_item_id: 10,
          version: 'V1',
          items: [{ item_id: 20, qty: 4 }],
        },
        TEST_COMPANY_ID,
      );

      expect(transactionManager.create).toHaveBeenCalledWith(
        Bom,
        expect.objectContaining({
          status: BomStatus.DRAFT,
          is_active: false,
        }),
      );
    });
  });
});
