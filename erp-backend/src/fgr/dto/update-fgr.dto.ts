import { PartialType } from '@nestjs/mapped-types';
import { CreateFgrDto } from './create-fgr.dto';

export class UpdateFgrDto extends PartialType(CreateFgrDto) {}
