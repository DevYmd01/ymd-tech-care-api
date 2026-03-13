import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { CreateItemMasterMapper } from './mapper/create-item-master.mapper';
import { UpdateItemMasterDto } from './dto/update-item-master.dto';
import { UpdateItemMasterMapper } from './mapper/update-item-master.mapper';

@Injectable()
export class ItemMasterService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createItemMasterDto: CreateItemMasterDto) {
        const data = CreateItemMasterMapper.toPersistence(createItemMasterDto);
        return this.prisma.item.create({
            data,
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
        });
    }

    async updateItemMaster(item_id: number, updateItemMasterDto: UpdateItemMasterDto) {
        const data = UpdateItemMasterMapper.toPersistence(updateItemMasterDto);
        return this.prisma.item.update({
            where: { item_id },
            data,
        });
    }

    async delete(item_id: number) {
        return this.prisma.item.delete({
            where: { item_id },
        });
    }
}
