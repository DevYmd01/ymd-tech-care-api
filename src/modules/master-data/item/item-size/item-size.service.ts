import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemSizeDto } from './dto/create-item-size.dto';

@Injectable()
export class ItemSizeService {
    constructor(private prisma: PrismaService) { }

    async create(createItemSizeDto: CreateItemSizeDto) {
        return await this.prisma.item_size.create({
            data: createItemSizeDto
        });
    }

    async findAll() {
        return await this.prisma.item_size.findMany();
    }

    async findOne(item_size_id: number) {
        return await this.prisma.item_size.findUnique({
            where: { item_size_id }
        });
    }

    async update(item_size_id: number, updateItemSizeDto: CreateItemSizeDto) {
        return await this.prisma.item_size.update({
            where: { item_size_id },
            data: updateItemSizeDto
        });
    }

    async remove(item_size_id: number) {
        return await this.prisma.item_size.delete({
            where: { item_size_id }
        });
    }
}
