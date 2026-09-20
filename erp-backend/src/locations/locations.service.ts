import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(dto: CreateLocationDto, companyId: number): Promise<Location> {
    if (!dto.location_code) {
      const lastLoc = await this.locationRepository.findOne({
        order: { id: 'DESC' },
        where: { company_id: companyId },
      });
      const nextId = lastLoc ? lastLoc.id + 1 : 1;
      dto.location_code = `LOC-${String(nextId).padStart(4, '0')}`;
    }
    const existing = await this.locationRepository.findOne({
      where: { location_code: dto.location_code, company_id: companyId },
    });
    if (existing) throw new ConflictException('Location code already exists.');

    const location = this.locationRepository.create({
      ...dto,
      company_id: companyId,
      warehouse: { id: dto.warehouse_id },
      parentLocation: dto.parent_location_id
        ? { id: dto.parent_location_id }
        : undefined,
    });
    return this.locationRepository.save(location);
  }

  async findAll(
    query: { status?: string; search?: string },
    companyId: number,
  ): Promise<any[]> {
    const findOptions: FindManyOptions<Location> = {
      order: { location_name: 'ASC' },
      relations: ['warehouse', 'parentLocation'],
    };

    const where: any = { company_id: companyId };
    if (query.status) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.is_active = query.status === 'active';
    }

    if (query.search) {
      const searchQuery = Like(`%${query.search}%`);
      findOptions.where = [
        { ...where, location_name: searchQuery },

        { ...where, location_code: searchQuery },

        { ...where, warehouse: { name: searchQuery } },
      ];
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      findOptions.where = where;
    }

    const locations = await this.locationRepository.find(findOptions);
    return locations.map((loc) => ({
      id: loc.id,
      location_code: loc.location_code,
      location_name: loc.location_name,
      location_type: loc.location_type,
      warehouse_name: loc.warehouse?.name,
      parent_location_name: loc.parentLocation?.location_name,
      is_active: loc.is_active,
    }));
  }

  async findOne(id: number, companyId: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id, company_id: companyId },
      relations: ['warehouse', 'parentLocation'],
    });
    if (!location) throw new NotFoundException(`Location #${id} not found`);
    return location;
  }

  // ✅ FIX: update method ko theek kiya gaya hai
  async update(id: number, dto: UpdateLocationDto, companyId: number): Promise<Location> {
    // Company check first — preload() below doesn't take a compound where, so
    // confirm the row belongs to this company before touching it.
    await this.findOne(id, companyId);

    // Step 1: Pehle sirf non-relational fields ke saath preload karein
    const location = await this.locationRepository.preload({
      id,
      ...dto,
      warehouse: dto.warehouse_id ? { id: dto.warehouse_id } : undefined,
    });

    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }

    // Step 2: Ab parentLocation ko alag se handle karein
    if (dto.parent_location_id !== undefined) {
      // Agar parent_location_id 'null' bheja gaya hai, to relation ko null set karein
      // Agar number bheja gaya hai, to relation ko uss id se set karein
      location.parentLocation = dto.parent_location_id
        ? ({ id: dto.parent_location_id } as Location)
        : null;
    }

    return this.locationRepository.save(location);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const location = await this.locationRepository.findOne({
      where: { id, company_id: companyId },
      relations: ['childLocations'],
    });
    if (!location) throw new NotFoundException(`Location #${id} not found`);
    if (location.childLocations && location.childLocations.length > 0) {
      throw new ConflictException(
        'Cannot delete location with child locations.',
      );
    }
    await this.locationRepository.softDelete(id);
  }
}
