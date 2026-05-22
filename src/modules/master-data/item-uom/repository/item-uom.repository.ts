import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemUomRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: Prisma.item_uomCreateInput) {
        return this.prisma.item_uom.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.item_uom.findMany();
    }

    async findByItemId(item_id: number) {
        return this.prisma.item_uom.findMany({
            where: {
                item_id,
            },
            include: {
                fromUom: true,
                toUom: true,
                itemBarcodes: true,
            },
            orderBy: {
                item_uom_id: 'asc',
            },

        });
    }

    async findById(item_uom_id: number) {
        return this.prisma.item_uom.findUnique({
            where: {
                item_uom_id,
            },
        });
    }

    async update(
        item_uom_id: number,
        data: Prisma.item_uomUpdateInput,
    ) {
        return this.prisma.item_uom.update({
            where: {
                item_uom_id,
            },
            data,
        });
    }

    async findByItemUomsByItemId(
        item_id: number,
    ) {
        return this.prisma.item_uom.findMany({
            where: {
                item_id,
            },
            include: {
                fromUom: true,
                toUom: true,
            },
            orderBy: {
                item_uom_id: 'asc',
            },
        });
    }
}