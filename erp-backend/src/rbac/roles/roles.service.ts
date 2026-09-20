import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Repository } from 'typeorm';

import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// Multi-company Phase 1: company_id is nullable on Role — NULL rows are
// shared "system" roles visible to every company; non-null rows are one
// company's own custom roles. Reads (findAll/findOne) surface both; writes
// (create/update/remove) only ever touch this company's own custom roles —
// a tenant can never create, edit, or delete a system role through this
// service. See src/rbac/roles/entities/role.entity.ts for the schema note.
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto, companyId: number): Promise<Role> {
    dto.name = dto.name.trim();

    const exists = await this.repo.findOne({
      where: [
        { name: ILike(dto.name), company_id: companyId },
        { name: ILike(dto.name), company_id: IsNull() },
      ],
    });

    if (exists) {
      throw new ConflictException(
        'Role with same name already exists.',
      );
    }

    const entity = this.repo.create({ ...dto, company_id: companyId });

    return this.repo.save(entity);
  }

  async findAll(
    companyId: number,
    params?: {
      search?: string;
      limit?: number;
      offset?: number;
    },
  ): Promise<Role[]> {
    // Visible = this company's own custom roles + every shared system role.
    const scopes: any[] = [{ company_id: companyId }, { company_id: IsNull() }];
    const where = params?.search
      ? scopes.map((s) => ({ ...s, name: ILike(`%${params.search}%`) }))
      : scopes;

    return this.repo.find({
      where,
      relations: {
        permissions: true,
      },
      order: {
        name: 'ASC',
      },
      take: params?.limit,
      skip: params?.offset,
    });
  }

  async findOne(id: number, companyId: number): Promise<Role> {
    const role = await this.repo.findOne({
      where: [
        { id, company_id: companyId },
        { id, company_id: IsNull() },
      ],
      relations: {
        permissions: true,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    return role;
  }

  async update(
    id: number,
    dto: UpdateRoleDto,
    companyId: number,
  ): Promise<Role> {
    // Scoped strictly to this company's own custom roles — company_id: null
    // (system) rows are deliberately excluded, not just found-then-blocked,
    // so a system role 404s here rather than leaking its existence via a
    // ForbiddenException.
    const role = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    if (
      dto.name &&
      dto.name.toLowerCase() !== role.name.toLowerCase()
    ) {
      const exists = await this.repo.findOne({
        where: [
          { name: ILike(dto.name), company_id: companyId },
          { name: ILike(dto.name), company_id: IsNull() },
        ],
      });

      if (exists) {
        throw new ConflictException(
          'Role name already exists.',
        );
      }
    }

    Object.assign(role, dto);

    return this.repo.save(role);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const role = await this.repo.findOne({ where: { id, company_id: companyId } });
    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    if (role.is_system) {
      throw new ForbiddenException(
        'System roles cannot be deleted.',
      );
    }

    const result = await this.repo.softDelete({ id, company_id: companyId });

    if (!result.affected) {
      throw new NotFoundException('Role not found.');
    }
  }

  async count(companyId: number): Promise<number> {
    return this.repo.count({ where: [{ company_id: companyId }, { company_id: IsNull() }] });
  }
}
