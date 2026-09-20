// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { RefreshStrategy } from './refresh.strategy'; // 🔹 Naya import add kiya
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const secret = cfg.get<string>('JWT_SECRET');

        if (!secret) {
          throw new Error('JWT_SECRET environment variable is required.');
        }

        return {
          secret,
          // This is only the JwtModule-wide default (used if some future
          // caller signs a token without its own expiresIn). AuthService's
          // login/refresh flow always passes its own expiresIn, sourced from
          // JWT_ACCESS_TTL/JWT_REFRESH_TTL — see AuthService and PLAN.md
          // step 0.13. Default matches AuthService's access-token TTL so
          // the two don't silently disagree.
          signOptions: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            expiresIn: (cfg.get<string>('JWT_ACCESS_TTL') ?? '15m') as any,
          },
        };
      },
    }),
    UsersModule,
    CompaniesModule,
  ],
  // 🔹 RefreshStrategy ko providers me add kar diya hai taaki NestJS isko recognize kare
  providers: [AuthService, JwtStrategy, RefreshStrategy],
  controllers: [AuthController],
  // ✅ Agar kisi aur module me custom Guard lagana ho, toh RefreshStrategy ko bhi export kar sakte hain
  exports: [AuthService, JwtStrategy, RefreshStrategy, JwtModule],
})
export class AuthModule {}
