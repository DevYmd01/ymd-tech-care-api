import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    async onModuleInit() {
        await this.$connect();
        // console.log('DATABASE_URL =', process.env.DATABASE_URL);
    }
}
