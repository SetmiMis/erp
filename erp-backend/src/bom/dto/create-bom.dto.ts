import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsNumber,
  IsBoolean,
  Min,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class BomItemDto {
  // 🛠️ Phase 1 fix: these fields had no validation decorators at all, so
  // NestJS's whitelist ValidationPipe (main.ts) silently stripped every
  // property here on every request — BOM creation/update always failed with
  // "items.0.property item_id should not exist".
  @IsInt()
  item_id: number;

  @IsNumber()
  @Min(0.001)
  qty: number;

  @IsOptional()
  @IsString()
  uom?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}

export class CreateBomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  // The finished good this BOM produces (see erp-backend/src/bom/entities/bom.entity.ts).
  @IsOptional()
  @IsInt()
  fg_item_id?: number;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BomItemDto)
  items: BomItemDto[];
}
