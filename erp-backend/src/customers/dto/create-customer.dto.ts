import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsPhoneNumber,
  IsPostalCode,
  IsNumber,
  Min,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { EmptyToUndefined } from '../../common/transformers/empty-to-undefined.transformer';

// Mirrors erp-backend/src/suppliers/dto/create-supplier.dto.ts
export const Trim = () =>
  Transform(({ value }) => (typeof value === 'string' ? value.trim() : value)); // eslint-disable-line @typescript-eslint/no-unsafe-return

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateCustomerDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Trim()
  customer_code?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Trim()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Trim()
  contact_person!: string;

  @IsEmail()
  @IsNotEmpty()
  @Trim()
  email!: string;

  @IsOptional()
  @EmptyToUndefined()
  @IsPhoneNumber('IN')
  phone?: string;

  @IsOptional()
  @EmptyToUndefined()
  @IsString()
  @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
    message: 'Invalid GST number format.',
  })
  @Trim()
  gst_number?: string;

  @IsOptional()
  @IsString()
  @Trim()
  billing_address?: string;

  @IsOptional()
  @IsString()
  @Trim()
  shipping_address?: string;

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
  @EmptyToUndefined()
  @IsPostalCode('IN')
  pincode?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  credit_limit?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  payment_terms?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class QueryCustomerDto {
  @IsOptional()
  status?: CustomerStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
