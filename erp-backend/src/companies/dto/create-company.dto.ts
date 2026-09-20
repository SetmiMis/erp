// erp-backend/src/companies/dto/create-company.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

const Trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)); // eslint-disable-line @typescript-eslint/no-unsafe-return

// Creates a Company row AND its first COMPANY_ADMIN user in one call — this
// is the replacement for the old "first user in the whole DB becomes
// SUPERADMIN" bootstrap (see AuthService.register()). Public endpoint, same
// trust level as the old /auth/register.
export class CreateCompanyDto {
  // --- Company fields ---
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Trim()
  name!: string;

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

  // --- First admin user fields (mirrors RegisterDto's shape/validation) ---
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'Admin username can contain only letters, numbers, underscore and dot.',
  })
  admin_username!: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  admin_name!: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  admin_email!: string;

  @MinLength(8)
  @MaxLength(100)
  admin_password!: string;
}
