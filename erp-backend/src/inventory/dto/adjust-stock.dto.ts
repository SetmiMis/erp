import {
  IsIn,
  IsInt,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class AdjustStockDto {
  @IsInt()
  warehouse_id: number;

  @IsInt()
  item_id: number;

  @IsIn(['IN', 'OUT'])
  adjustment_type: 'IN' | 'OUT';

  @IsNumber()
  @Min(0.001)
  qty: number;

  @IsString()
  @MinLength(1)
  reason: string;
}
