import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum LocationType {
  AREA = 'area',
  RACK = 'rack',
  BIN = 'bin',
  FLOOR = 'floor',
  COLD_STORAGE = 'cold_storage',
  QUARANTINE = 'quarantine',
}

export class CreateLocationDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  location_code?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location_name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(LocationType)
  @IsOptional()
  location_type?: string = LocationType.RACK;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  capacity?: number = 0;

  @IsBoolean()
  @IsOptional()
  is_default?: boolean = false;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;

  @IsNumber()
  @IsNotEmpty()
  warehouse_id: number;

  @IsNumber()
  @IsOptional()
  parent_location_id?: number;
}
