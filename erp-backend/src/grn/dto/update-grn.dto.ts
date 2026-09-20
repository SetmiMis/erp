import { PartialType } from '@nestjs/mapped-types';
import { CreateGrnDto } from './create-grn.dto';
import { IsOptional, IsEnum } from 'class-validator';

export class UpdateGrnDto extends PartialType(CreateGrnDto) {
  @IsOptional()
  @IsEnum(['pending', 'received', 'closed', 'cancelled'])
  status?: 'pending' | 'received' | 'closed' | 'cancelled';
}
