import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { CreateItemMasterMapper } from './mapper/create-item-master.mapper';
import { UpdateItemMasterDto } from './dto/update-item-master.dto';
import { UpdateItemMasterMapper } from './mapper/update-item-master.mapper';
import { ItemBarcodeService } from '../item-barcode/item-barcode.service';
import { diffById } from '@/common/utils';

@Injectable()
export class ItemMasterService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly itemBarcodeService: ItemBarcodeService,
    ) {}

async create(createItemMasterDto: CreateItemMasterDto) {
    return this.prisma.$transaction(async (tx) => {

        // 1️⃣ create item
        const item = await tx.item.create({
            data: CreateItemMasterMapper.toPersistence(createItemMasterDto),
        });

        // 2️⃣ create barcodes (หลายตัว)
        if (createItemMasterDto.barcodes?.length) {
            await tx.item_barcode.createMany({
                data: createItemMasterDto.barcodes.map(b => ({
                    item_id: item.item_id,
                    barcode: b.barcode,
                    uom_id: b.uom_id,
                    is_primary: b.is_primary,
                    is_active: true
                }))
            });
        }

        return item;
    });
}

async getAll() {
    const items = await this.prisma.item.findMany({
        include: {
            itemGroup: true,
            itemPattern: true,
            itemGrade: true,
            itemColor: true,
            itemSize: true,
            itemClass: true,
            itemDesign: true,
            itemType: true,
            itemBrand: true,
            baseUom: true,
            saleUom: true,
            taxCode: true,
            itemCategory: true,
        },
        orderBy: { item_id: 'asc' },
    });

    return items.map((item) => ({
        item_id: item.item_id,
        item_code: item.item_code,
        item_name: item.item_name,
 item_category_id: item.itemCategory?.item_category_id ?? null,
        item_category_name: item.itemCategory?.item_category_name ?? null,
        item_category_code: item.itemCategory?.item_category_code ?? null,
        item_group_id: item.itemGroup?.item_group_id ?? null,
        item_group_name: item.itemGroup?.item_group_name ?? null,
        item_group_code: item.itemGroup?.item_group_code ?? null,
item_brand_code: item.itemBrand?.item_brand_code ?? null,
        item_pattern_name: item.itemPattern?.item_pattern_name ?? null,
        item_grade_name: item.itemGrade?.item_grade_name ?? null,
        item_color_name: item.itemColor?.item_color_name ?? null,
        item_size_name: item.itemSize?.item_size_name ?? null,
        item_class_name: item.itemClass?.item_class_name ?? null,
        item_design_name: item.itemDesign?.item_design_name ?? null,
        item_type_name: item.itemType?.item_type_name ?? null,
        item_type_code: item.itemType?.item_type_code ?? null,
        item_brand_name: item.itemBrand?.item_brand_name ?? null,
        base_uom_name: item.baseUom?.uom_name ?? null,
        sale_uom_name: item.saleUom?.uom_name ?? null,
        
    }));
}

    async getById(item_id: number) {
        return this.prisma.item.findUnique({
            where: { item_id },
            include: {
                itemBarcodes: true,
            }
        });
    }

    async updateItemMaster(item_id: number, updateItemMasterDto: UpdateItemMasterDto) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Update Item Master
            const itemData = UpdateItemMasterMapper.toPersistence(updateItemMasterDto);
            await tx.item.update({
                where: { item_id },
                data: itemData,
            });

            // 2. Handle Barcodes if 'barcodes' property is present in the DTO
            if ('barcodes' in updateItemMasterDto) {
                const incomingBarcodes = updateItemMasterDto.barcodes || [];
                const existingBarcodes = await tx.item_barcode.findMany({
                    where: { item_id: item_id },
                });

                const diff = diffById(
                    existingBarcodes,
                    incomingBarcodes,
                    'item_barcode_id'
                );

                // Delete barcodes
                if (diff.toDelete.length > 0) {
                    await tx.item_barcode.deleteMany({
                        where: {
                            item_barcode_id: { in: diff.toDelete.map(b => b.item_barcode_id) },
                        },
                    });
                }

                // Update barcodes
                for (const barcode of diff.toUpdate) {
                    await tx.item_barcode.update({
                        where: { item_barcode_id: barcode.item_barcode_id },
                        data: {
                            barcode: barcode.barcode,
                            uom_id: barcode.uom_id,
                            is_primary: barcode.is_primary,
                        },
                    });
                }

                // Create new barcodes
                if (diff.toCreate.length > 0) {
                    await tx.item_barcode.createMany({
                        data: diff.toCreate.map(b => ({
                            item_id: item_id,
                            barcode: b.barcode,
                            uom_id: b.uom_id,
                            is_primary: b.is_primary,
                            is_active: true,
                        })),
                    });
                }
            }

            return this.getById(item_id);
        });
    }

    async delete(item_id: number) {
        return this.prisma.item.delete({
            where: { item_id },
        });
    }
}
