import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ApiLogCleanupService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ทุกวันตี 3
  @Cron('0 3 * * *')
  async cleanup() {

    const days = 30;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const result = await this.prisma.api_log.deleteMany({
      where: {
        created_at: {
          lt: cutoff,
        },
      },
    });

    console.log(
      `Deleted ${result.count} api logs`,
    );
  }
}