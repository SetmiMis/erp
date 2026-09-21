import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
  IsNumber,
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

  // The finished good this BOM produces (see erp-backend/src/bom/entities/bom.entity.ts).
  @IsOptional()
  @IsInt()
  fg_item_id?: number;

  @IsOptional()
  @IsString()
  version?: string;

  // `status`/`is_active` are deliberately not settable here (PLAN.md step
  // 1.5) -- every BOM is created as draft and moves through the approval
  // workflow via BomController's submit/approve/reject endpoints instead.
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BomItemDto)
  items: BomItemDto[];
}
