import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsDateString,
  IsOptional,
  IsInt,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateGrnItemDto {
  @IsNotEmpty()
  @IsInt()
  item_id!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  received_qty!: number;

  @IsOptional()
  remarks?: string;

  // PLAN.md step 1.6: required by GrnService.create() when this item is
  // batch_tracked, ignored otherwise.
  @IsOptional()
  @IsString()
  @MaxLength(100)
  batch_no?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;
}

export class CreateGrnDto {
  @IsDateString()
  grn_date!: string;

  @IsNotEmpty()
  @IsInt()
  warehouse_id!: number;

  @IsOptional()
  @IsNotEmpty()
  supplier_ref?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGrnItemDto)
  items!: CreateGrnItemDto[];
}
