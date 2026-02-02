import { Controller } from '@nestjs/common';
import { ItemGroupService } from './item-group.service';
import { CreateItemGroupDto } from './dto/cerate-item-group.dto';
import { Body, Delete, Get, Param, Post, Patch } from '@nestjs/common';

@Controller('item-group')
export class ItemGroupController {
    constructor(private readonly itemGroupService: ItemGroupService) { }

    @Post()
    async createItemGroup(@Body() createItemGroupDto: CreateItemGroupDto) {
        return this.itemGroupService.createItemGroup(createItemGroupDto);
    }

    @Get()
    async getAllItemGroup() {
        return this.itemGroupService.getAllItemGroup();
    }

    @Get(':item_group_id')
    async getItemGroupById(@Param('item_group_id') item_group_id: string) {
        return this.itemGroupService.getItemGroupById(Number(item_group_id));
    }

    @Patch(':item_group_id')
    async updateItemGroup(@Param('item_group_id') item_group_id: string, @Body() updateItemGroupDto: CreateItemGroupDto) {
        return this.itemGroupService.updateItemGroup(Number(item_group_id), updateItemGroupDto);
    }

    @Delete(':item_group_id')
    async deleteItemGroup(@Param('item_group_id') item_group_id: string) {
        return this.itemGroupService.deleteItemGroup(Number(item_group_id));
    }
}
