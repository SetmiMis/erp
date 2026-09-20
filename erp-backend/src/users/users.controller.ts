// src/users/users.controller.ts
import {
  Controller,
  Get,
  Param,
  Delete,
  Patch, // Put ki jagah Patch use kar rahe hain partial update ke liye
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto'; // 🔹 Imported UpdateUserDto
import { UserRole } from './enums/user.enum';
import { CompanyId } from '../common/decorators/company-id.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Controller level par guard laga hai, isliye routes par bar-bar likhne ki zaroorat nahi hai
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Sirf admin role ko saare users dekhne ka access
   */
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Get()
  async findAll(@CompanyId() companyId: number) {
    return this.usersService.listAll(companyId);
  }

  /**
   * GET /users/:id
   * Admin & store dono dekh sakte hain ek user
   */
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @CompanyId() companyId: number) {
    return this.usersService.findById(id, companyId);
  }

  /**
   * PATCH /users/:id
   * Sirf admin update kar sakta hai - P0 (No any rule applied)
   */
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Patch(':id') // Changed from @Put to @Patch for cleaner restful partial updates
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto, // 🔹 'any' hatakar strict DTO use kiya
    @CompanyId() companyId: number,
  ) {
    await this.usersService.updateUser(id, updateUserDto, companyId);
    return { message: 'User updated successfully' };
  }

  /**
   * DELETE /users/:id
   * Sirf admin delete (soft delete) kar sakta hai
   */
  @Roles(UserRole.SUPERADMIN, UserRole.COMPANY_ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @CompanyId() companyId: number) {
    await this.usersService.deleteById(id, companyId);
    return { message: 'User deleted successfully' };
  }
}
