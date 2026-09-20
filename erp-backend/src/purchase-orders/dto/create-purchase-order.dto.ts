// erp-backend/src/purchase-orders/dto/create-purchase-order.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO for each item within a purchase order
class CreatePurchaseOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  item_id: number;

  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  ordered_qty: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unit_price: number;

  @IsString()
  @IsOptional()
  uom?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  @IsOptional()
  discount_percent?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  tax_percent?: number;
}

// Main DTO for creating the purchase order
export class CreatePurchaseOrderDto {
  @IsString()
  @IsOptional()
  po_number?: string;

  @IsInt()
  @IsNotEmpty({ message: 'A supplier must be selected.' })
  supplier_id: number;

  @IsInt()
  @IsNotEmpty({ message: 'A warehouse must be selected.' })
  warehouse_id: number;

  @IsDateString()
  @IsNotEmpty()
  order_date: string;

  @IsDateString()
  @IsOptional()
  expected_date?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  terms_and_conditions?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseOrderItemDto)
  @IsNotEmpty()
  items: CreatePurchaseOrderItemDto[];
}
