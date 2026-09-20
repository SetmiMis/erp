// erp-backend/src/companies/dto/update-company.dto.ts
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

const Trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)); // eslint-disable-line @typescript-eslint/no-unsafe-return

// Deliberately separate from CreateCompanyDto (not a PartialType of it) — the
// admin_* fields on create are a one-time bootstrap action, not something
// that should ever be PATCHable here.
export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Trim()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Trim()
  legal_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Trim()
  gstin?: string;

  @IsOptional()
  @IsString()
  @Trim()
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  state?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  country?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
