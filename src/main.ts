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
  // Validation
  // -----------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // -----------------------------
  // CORS
  // -----------------------------
  const allowedOrigins =
    process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // -----------------------------
  // Static files
  // -----------------------------
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // -----------------------------
  // Global prefix (CLEAN VERSION)
  // -----------------------------
  app.setGlobalPrefix('api', {
    exclude: ['/uploads'], // ✅ ห้ามใช้ *path
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();