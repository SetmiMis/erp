// erp-backend/src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  ConflictException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';

// '/auth' route par saare requests yahan aayenge
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Naye user ko register karne ke liye endpoint.
   */
  // Audit fix #5 (AUDIT_REPORT.md §1.3/§1.7): 5 attempts/min per IP —
  // tighter than the app-wide default, since this and login are the two
  // routes a brute-force/spam attempt would actually target.
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string; user: Omit<User, 'password_hash'> }> {
    try {
      // AuthService ko register karne ke liye kehte hain.
      // Service layer mein hi password hash ho jaayega.
      const user = await this.authService.register(registerDto);

      // Safal registration par ek saaf message aur user data (bina password) bhejte hain.
      return {
        message: 'User registered successfully',
        user,
      };
    } catch (error: any) {
      // Agar 'users.service' se 'ConflictException' (409) aati hai (duplicate email/username)
      if (error instanceof ConflictException) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }

      // Agar class-validator se koi validation error aata hai
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.response?.message) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const messages = Array.isArray(error.response.message)
          ? error.response.message.join(', ') // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          : error.response.message; // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new HttpException(messages, HttpStatus.BAD_REQUEST);
      }

      // Baaki sabhi errors ke liye ek general error bhejte hain.
      throw new HttpException(
        'Could not register user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * POST /auth/login
   * User ko login karke JWT token generate karne ke liye endpoint.
   */
  // Audit fix #5 (AUDIT_REPORT.md §1.3/§1.7): 5 attempts/min per IP — no
  // rate limiting existed on login before this, so credential brute-forcing
  // was unbounded.
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  // Safal login par hamesha '200 OK' status code bhejenge.
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    // 1. Pehle user ke credentials ko validate karte hain.
    const user = await this.authService.validateUser(
      loginDto.usernameOrEmail,
      loginDto.password,
    );

    // 2. Agar validateUser 'null' return karta hai, matlab credentials galat hain.
    if (!user) {
      // Standard 'UnauthorizedException' (401) throw karte hain.
      throw new UnauthorizedException('Invalid credentials. Please try again.');
    }

    // 3. Agar user valid hai, toh authService.login se token aur user data generate karke bhejte hain.
    return this.authService.login(user);
  }

  /**
   * POST /auth/refresh
   * Refresh token ke jariye naye Access aur Refresh tokens generate karne ke liye endpoint.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req: any) {
    // Strategy se request me 'user' object attach hota hai jisme id aur refreshToken hota hai
    return this.authService.refreshTokens(req.user.id, req.user.refreshToken);
  }

  /**
   * POST /auth/logout
   * User ko logout karne ke liye aur unka refresh token database/redis se remove karne ke liye.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt')) // Standard Access Token verification guard
  async logout(@Req() req: any) {
    // Strategy se mile user id ke base par token clear karenge
    return this.authService.logout(req.user.id);
  }
}