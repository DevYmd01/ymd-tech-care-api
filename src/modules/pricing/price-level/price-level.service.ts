import { Injectable } from '@nestjs/common';
import { UpdatePriceLevelDto } from './dto/update-price-level.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PriceLevelService {
    constructor( private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.price_level.findMany();
    }

    async findOne(id: number) {
        return this.prisma.price_level.findUnique({
            where: { id },
        });
    }

    async update(id: number, updatePriceLevelDto: UpdatePriceLevelDto) {
        return this.prisma.price_level.update({
            where: { id },
            data: {
                name: updatePriceLevelDto.name,
            },
        });
    }
}
