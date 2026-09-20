import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreatePOItemDto {
  @IsNumber()
  item_id: number;

  @IsNumber()
  @Min(0)
  required_qty: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}

export class CreateProductionOrderDto {
  @IsNumber()
  fg_item_id: number;

  @IsNumber()
  warehouse_id: number;

  @IsNumber()
  @Min(0.001)
  quantity: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePOItemDto)
  items: CreatePOItemDto[];
}
