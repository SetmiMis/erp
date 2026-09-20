import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from '../../auth/dto/register.dto';
import { UserStatus, UserRole } from '../enums/user.enum';

export class UpdateUserDto extends PartialType(RegisterDto) {
  status?: UserStatus;
  role?: UserRole;
  refresh_token_hash?: string | null;
  updated_by?: number;
}