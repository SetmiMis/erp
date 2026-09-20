import {
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateFgrDto {
  @IsString()
  @IsNotEmpty()
  receipt_number: string;

  @IsString()
  @IsNotEmpty()
  production_order_no: string;

  // ✅ item_code is required by StocksService
  @IsString()
  @IsNotEmpty()
  item_code: string;

  @IsString()
  @IsNotEmpty()
  item_name: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  uom: string;

  @IsString()
  @IsNotEmpty()
  warehouse_name: string;

  @IsDateString()
  receipt_date: string;

  @IsOptional()
  @IsEnum(['draft', 'confirmed'])
  status?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
