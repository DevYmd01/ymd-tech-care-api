import { Injectable } from '@nestjs/common';
import { CreateItemGroupDto } from './dto/cerate-item-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemGroupService {
    constructor(private readonly prismaService: PrismaService) { }

    async createItemGroup(createItemGroupDto: CreateItemGroupDto) {
        return this.prismaService.item_group.create({
            data: {
                item_group_code: createItemGroupDto.item_group_code,
                item_group_name: createItemGroupDto.item_group_name,
                item_group_nameeng: createItemGroupDto.item_group_nameeng,
                is_active: createItemGroupDto.is_active || true,
            }
        });
    }

    async getAllItemGroup() {
        return this.prismaService.item_group.findMany({
            where: {
                is_active: true,
            },
        });
    }

    async getItemGroupById(item_group_id: number) {
        return this.prismaService.item_group.findUnique({
            where: {
                item_group_id: item_group_id,
            },
        });
    }

    async updateItemGroup(item_group_id: number, updateItemGroupDto: CreateItemGroupDto) {
        return this.prismaService.item_group.update({
            where: {
                item_group_id: item_group_id,
            },
            data: {
                item_group_code: updateItemGroupDto.item_group_code,
                item_group_name: updateItemGroupDto.item_group_name,
                item_group_nameeng: updateItemGroupDto.item_group_nameeng,
                is_active: updateItemGroupDto.is_active || true,
            },
        });
    }

    async deleteItemGroup(item_group_id: number) {
        return this.prismaService.item_group.delete({
            where: {
                item_group_id: item_group_id,
            },
        });
    }
}
