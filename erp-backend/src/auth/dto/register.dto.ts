import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  // Tenant boundary (see Multi-Company Architecture Audit — Phase 1). Must
  // reference an existing company (created via POST /api/companies); this
  // endpoint always creates a plain USER inside it — see AuthService.register.
  @IsInt()
  @IsPositive()
  company_id: number;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message:
      'Username can contain only letters, numbers, underscore and dot.',
  })
  username: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(100)
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  full_name: string;
}