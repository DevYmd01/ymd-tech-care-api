import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrencyService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return this.prismaService.currency.findMany({
            select: {
                currency_id: true,
                currency_code: true,
                currency_name: true,
                exchange_rate: true,
                status: true,
            }
        });
    }

    async create(dto: CreateCurrencyDto) {
        return this.prismaService.currency.create({
            data: dto,
        });
    }

    async findOne(id: number) {
        return this.prismaService.currency.findUnique({
            where: {
                currency_id: id,
            },
        });
    }

    async update(id: number, dto: CreateCurrencyDto) {
        return this.prismaService.currency.update({
            where: {
                currency_id: id,
            },
            data: dto,
        });
    }
}
