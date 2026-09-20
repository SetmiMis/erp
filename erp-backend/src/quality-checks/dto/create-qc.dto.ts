import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
  IsIn,
  Min,
} from 'class-validator';

class CreateQcItemDto {
  @IsInt()
  @IsPositive()
  grn_item_id: number;

  @IsNumber()
  @Min(0)
  checked_qty: number;

  @IsNumber()
  @Min(0)
  passed_qty: number;

  @IsNumber()
  @Min(0)
  failed_qty: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}

export class CreateQualityCheckDto {
  @IsDateString()
  qc_date: string;

  @IsInt()
  @IsPositive()
  grn_id: number;

  @IsString()
  @IsNotEmpty()
  inspector: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsIn(['pending', 'approved', 'rejected'])
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQcItemDto)
  items: CreateQcItemDto[];
}
