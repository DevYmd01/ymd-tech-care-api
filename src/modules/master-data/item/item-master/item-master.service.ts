import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { CreateItemMasterMapper } from './mapper/create-item-master.mapper';
import { UpdateItemMasterDto } from './dto/update-item-master.dto';
import { UpdateItemMasterMapper } from './mapper/update-item-master.mapper';
import { ItemBarcodeService } from '../item-barcode/item-barcode.service';
import { diffById } from '@/common/utils';
import { NotFoundException } from '@nestjs/common';

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
            const incomingBarcodes = createItemMasterDto.barcodes;
            const primaryIncomingBarcodes = incomingBarcodes.filter(b => b.is_primary);

            if (primaryIncomingBarcodes.length > 1) {
                throw new BadRequestException('Only one primary barcode is allowed per item during creation.');
            }
            await tx.item_barcode.createMany({
                data: incomingBarcodes.map(b => ({
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
    const item = await this.prisma.item.findUnique({
        where: { item_id },
        include: {
            itemBarcodes: true,
        }
    });

    if (!item) {
        throw new NotFoundException('Item not found');
    }

    return item;
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

                // Rule 1: Only one primary barcode allowed in incoming data
                const primaryIncomingBarcodes = incomingBarcodes.filter(b => b.is_primary);
                if (primaryIncomingBarcodes.length > 1) {
                    throw new BadRequestException('Only one primary barcode is allowed per item.');
                }

                const diff = diffById(
                    existingBarcodes,
                    incomingBarcodes,
                    'item_barcode_id'
                );

                // Rule 2: Cannot delete a primary barcode directly. It must be set to is_primary: false first.
                const primaryExistingBarcode = existingBarcodes.find(b => b.is_primary);
                if (primaryExistingBarcode && diff.toDelete.some(b => b.item_barcode_id === primaryExistingBarcode.item_barcode_id)) {
                    throw new BadRequestException('Cannot delete the primary barcode directly. Please set it as non-primary first.');
                }

                // Step A: Demote all current primary barcodes if a new primary is being set or if no primary is sent.
                // This ensures that only the intended barcode (if any) remains primary.
                if (primaryIncomingBarcodes.length === 1 || (primaryIncomingBarcodes.length === 0 && existingBarcodes.some(b => b.is_primary))) {
                    await tx.item_barcode.updateMany({
                        where: {
                            item_id: item_id,
                            is_primary: true,
                        },
                        data: { is_primary: false },
                    });
                }

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
                    // The is_primary status will be correctly set by the global demotion (Step A)
                    // and then potentially re-promoted if it's the new primary in the incoming DTO.
                    // So, we just apply the incoming is_primary value.
                    await tx.item_barcode.update({ where: { item_barcode_id: barcode.item_barcode_id }, data: barcode });
                }

                // Create new barcodes
                if (diff.toCreate.length > 0) {
                    await tx.item_barcode.createMany({
                        data: diff.toCreate.map(b => ({
                            item_id: item_id,
                            ...b, // Spread operator to include all properties from b, including is_primary
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
