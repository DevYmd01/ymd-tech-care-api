import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ApiLogMiddleware
  implements NestMiddleware {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    const start = Date.now();

    res.on('finish', async () => {

      const responseTime =
        Date.now() - start;

      try {

        await this.prisma.api_log.create({

          data: {

            method: req.method,

            path: req.originalUrl,

            status_code: res.statusCode,

            response_ms: responseTime,

            ip_address: req.ip,

            employee_id:
              (req as any).user?.employee_id,
          },
        });

      } catch (error) {

        console.error(
          'API LOG ERROR',
          error,
        );
      }
    });

    next();
  }
}