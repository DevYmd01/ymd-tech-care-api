import { Injectable } from '@nestjs/common';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemCategoryService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateItemCategoryDto) {
        return this.prisma.item_category.create({
            data: dto,
        });
    }

    async findAll() {
        return this.prisma.item_category.findMany({
            where: {
                is_active: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.item_category.findUnique({
            where: {
                item_category_id: id,
            },
        });
    }

    async update(id: number, dto: CreateItemCategoryDto) {
        return this.prisma.item_category.update({
            where: {
                item_category_id: id,
            },
            data: dto,
        });
    }
}
