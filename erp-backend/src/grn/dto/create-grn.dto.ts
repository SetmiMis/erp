import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsDateString,
  IsOptional,
  IsInt,
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
