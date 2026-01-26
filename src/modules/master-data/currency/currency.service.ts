import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CurrencyService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.currency.findMany({
            where: {
                status: 'ACTIVE',
            },
            select: {
                currency_id: true,
                currency_code: true,
                currency_name: true,
                exchange_rate: true,
                status: true,
            }
        });
    }
}
