import { PartialType } from '@nestjs/mapped-types';
import { CreateQualityCheckDto } from './create-qc.dto';

export class UpdateQualityCheckDto extends PartialType(CreateQualityCheckDto) {}
