import { Injectable } from '@nestjs/common';
import { CreateMultiPriceItemDto } from './dto/create-multi-price-item.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MultiPriceItemRepository } from './repository/multi-price-item.repository';
import { CreateMultiPriceItemMapper } from './mapper/create-multi-price-item.mapper';
import { UpdateMultiPriceItemMapper } from './mapper/update-multi-price-item.mapper';


@Injectable()
export class MultiPriceItemService {
    constructor( 
        private readonly prisma: PrismaService,
        private readonly multiPriceItemRepository: MultiPriceItemRepository
    ) {}

    async create(createMultiPriceItemDto: CreateMultiPriceItemDto) {
        return this.prisma.$transaction(async (tx) => {
            const multiPriceItemData = CreateMultiPriceItemMapper.toPrisma(createMultiPriceItemDto);
            const multiPriceItem = await this.multiPriceItemRepository.create(tx, multiPriceItemData);   
            return multiPriceItem;
        }); 
    }

    async findAll() {
        return this.prisma.multi_price_item.findMany();
    }

    async findOne(id: number) {
        return this.prisma.multi_price_item.findUnique({
            where: { multi_price_item_id: id },
        });
    }

    async update(id: number, updateMultiPriceItemDto: CreateMultiPriceItemDto) {
        return this.prisma.$transaction(async (tx) => {
            const multiPriceItemData = UpdateMultiPriceItemMapper.toPrisma(updateMultiPriceItemDto);
            const multiPriceItem = await this.multiPriceItemRepository.update(
                tx,
                { multi_price_item_id: id },
                multiPriceItemData
            );
            return multiPriceItem;
        });
    }
}
