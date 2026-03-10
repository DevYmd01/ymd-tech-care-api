import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { winstonLogger } from './logger/winston.config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });

  // -----------------------------
  // Global Validation
  // -----------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // -----------------------------
  // CORS CONFIG (FIXED VERSION)
  // -----------------------------
  const allowedOrigins =
    process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [];

  app.enableCors({
    origin: (origin, callback) => {
      // allow server-to-server / curl
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.length === 0 || // ถ้าไม่ได้ตั้งค่า .env ให้ผ่านหมด (dev)
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // -----------------------------
  // Static Files
  // -----------------------------
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // -----------------------------
  // Global Prefix
  // -----------------------------
  app.setGlobalPrefix('api', {
    exclude: ['/uploads/(.*)'],
  });

  // -----------------------------
  // START SERVER (IMPORTANT)
  // -----------------------------
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();