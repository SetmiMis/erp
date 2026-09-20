import { IsNumber, Min } from 'class-validator';

export class DispatchItemDto {
  @IsNumber()
  item_id: number;

  @IsNumber()
  @Min(0.001) // Ensure quantity is greater than 0
  quantity: number;
}
