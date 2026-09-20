import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

// A helper class to validate each item being dispatched
class DispatchItemDto {
  @IsString()
  @IsNotEmpty()
  item_code: string;

  @IsNumber()
  @IsPositive()
  dispatched_qty: number;
}

export class CreateDispatchDto {
  @IsString()
  @IsNotEmpty()
  dispatch_number: string;

  @IsString()
  @IsNotEmpty()
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  warehouse_name: string;

  @IsDateString()
  dispatch_date: string;

  @IsArray()
  @ValidateNested({ each: true }) // Validates each item in the array
  @Type(() => DispatchItemDto) // Specifies the class for the array items
  items: DispatchItemDto[];

  @IsOptional()
  @IsEnum(['draft', 'dispatched', 'delivered', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  // Note: total_value is intentionally omitted. It's a best practice
  // to calculate totals on the backend to ensure data integrity.
}
