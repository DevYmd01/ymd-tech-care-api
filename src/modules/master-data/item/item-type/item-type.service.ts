import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemTypeDTO } from './dto/cerate-item-type.dto';

@Injectable()
export class ItemTypeService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.item_type.findMany();
    }

    async findOne(item_type_id: number) {
        return this.prisma.item_type.findUnique({ where: { item_type_id } });
    }

    async create(createItemTypeDTO: CreateItemTypeDTO) {
        return this.prisma.item_type.create({
            data: {
                item_type_code: createItemTypeDTO.item_type_code,
                item_type_name: createItemTypeDTO.item_type_name,
                item_type_nameeng: createItemTypeDTO.item_type_nameeng,
            }
        });
    }

    async update(item_type_id: number, updateItemTypeDTO: CreateItemTypeDTO) {
        return this.prisma.item_type.update({
            where: { item_type_id },
            data: {
                item_type_code: updateItemTypeDTO.item_type_code,
                item_type_name: updateItemTypeDTO.item_type_name,
                item_type_nameeng: updateItemTypeDTO.item_type_nameeng,
            }
        });
    }
}
