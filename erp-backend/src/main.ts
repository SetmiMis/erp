// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Prefix (P1) -> /api/auth/login, /api/users
  app.setGlobalPrefix('api');

  // 2. Strong ValidationPipe (P0) -> Secures payloads & auto-converts types
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Extra un-mapped properties ko hata dega
      forbidNonWhitelisted: true, // Extra fields aane par request fail kar dega
      transform: true, // Payloads ko target DTO types me convert karega
      transformOptions: {
        enableImplicitConversion: true, // Query/Param strings ko number/boolean bana dega
      },
    }),
  );

  // 3. Global Exception Filter (P1)
  app.useGlobalFilters(new HttpExceptionFilter());

  // 4. Global Response Interceptor (P1)
  app.useGlobalInterceptors(new TransformInterceptor());

  // CORS — Audit fix #6 (AUDIT_REPORT.md §1.7): app.enableCors() with no
  // options accepts every origin, which is fine for a quick local check but
  // not something to carry into staging/production. CORS_ORIGINS is a
  // comma-separated allow-list (e.g. "https://app.example.com,https://admin.example.com");
  // unset, it falls back to the frontend's local dev origins only.
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : ['http://localhost:3000', 'http://127.0.0.1:3000'];
  app.enableCors({ origin: corsOrigins, credentials: true });

  await app.listen(3001);
  console.log(`🚀 ERP Backend running on: http://localhost:3001/api`);
}
bootstrap();