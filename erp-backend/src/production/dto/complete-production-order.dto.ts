import { IsNumber, IsOptional, Min } from 'class-validator';

export class CompleteProductionOrderDto {
  @IsNumber()
  @Min(0.001)
  produced_qty: number;

  @IsOptional()
  @IsNumber()
  warehouse_id?: number;

  @IsOptional()
  remarks?: string;
}
