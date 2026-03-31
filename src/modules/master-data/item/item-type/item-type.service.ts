import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemTypeDTO } from './dto/cerate-item-type.dto';

@Injectable()
export class ItemTypeService {
    constructor(private readonly prisma: PrismaService) { }

async findAll() {
    return this.prisma.item_type.findMany({
        orderBy: { item_type_id: 'asc' },
    });
}

    async findOne(item_type_id: number) {
        return this.prisma.item_type.findUnique({ where: { item_type_id } });
    }

    async create(createItemTypeDTO: CreateItemTypeDTO) {
        const created = await this.prisma.item_type.create({
            data: {
                item_type_code: createItemTypeDTO.item_type_code,
                item_type_name: createItemTypeDTO.item_type_name,
                item_type_nameeng: createItemTypeDTO.item_type_nameeng,
                is_active: createItemTypeDTO.is_active ?? true, // กำหนดค่าเริ่มต้นเป็น true หากไม่ได้ส่งมา
            }
        });
        return {
            success: true,
            data: created,
            message: 'สร้างประเภทสินค้าเรียบร้อย',
        };
    }

    async update(item_type_id: number, updateItemTypeDTO: CreateItemTypeDTO) {
        const updated = await this.prisma.item_type.update({
            where: { item_type_id },
            data: {
                item_type_code: updateItemTypeDTO.item_type_code,
                item_type_name: updateItemTypeDTO.item_type_name,
                item_type_nameeng: updateItemTypeDTO.item_type_nameeng,
                is_active: updateItemTypeDTO.is_active ?? false, // กำหนดค่าเริ่มต้นเป็น true หากไม่ได้ส่งมา
            }
        });

        return {
            success: true,
            data: updated,
            message: 'แก้ไขประเภทสินค้าเรียบร้อย',
        };
        
    }
}
