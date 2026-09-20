// erp-backend/src/purchase-orders/dto/create-po-item.dto.ts

import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreatePurchaseOrderItemDto {
  @IsNumber()
  item_id: number;

  @IsNumber()
  @IsPositive() // This is a more readable way to say "must be greater than 0"
  ordered_qty: number;

  @IsNumber()
  @Min(0)
  unit_price: number;
}
