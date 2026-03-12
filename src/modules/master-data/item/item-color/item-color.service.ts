import { Injectable } from '@nestjs/common';
import { CreateItemColorDto } from './dto/create-item-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemColorService {
    constructor(private prisma: PrismaService) { }

    async create(createItemColorDto: CreateItemColorDto) {
        return this.prisma.item_color.create({
            data: {
                item_color_code: createItemColorDto.item_color_code,
                item_color_name: createItemColorDto.item_color_name,
                item_color_nameeng: createItemColorDto.item_color_nameeng || '',
                is_active: createItemColorDto.is_active,
            },
        });
    }

    async findAll() {
        return this.prisma.item_color.findMany(
            {
                orderBy: { item_color_id: 'asc' }
            }
        );
    }

    async findOne(item_color_id: number) {
        return this.prisma.item_color.findUnique({
            where: { item_color_id },
        });
    }

    async update(item_color_id: number, updateItemColorDto: CreateItemColorDto) {
        return this.prisma.item_color.update({
            where: { item_color_id },
            data: {
                item_color_code: updateItemColorDto.item_color_code,
                item_color_name: updateItemColorDto.item_color_name,
                item_color_nameeng: updateItemColorDto.item_color_nameeng || '',
                is_active: updateItemColorDto.is_active ,
            },
        });
    }

    async remove(item_color_id: number) {
        return this.prisma.item_color.delete({
            where: { item_color_id },
        });
    }

}
