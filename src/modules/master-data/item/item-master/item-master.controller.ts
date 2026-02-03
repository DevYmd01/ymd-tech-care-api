import { Controller } from '@nestjs/common';
import { ItemMasterService } from './item-master.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { Body, Delete, Get, Param, Post, Patch } from '@nestjs/common';

@Controller('item-master')
export class ItemMasterController {
    constructor(private readonly itemMasterService: ItemMasterService) { }

    @Post()
    async createItemMaster(@Body() createItemMasterDto: CreateItemMasterDto) {
        return this.itemMasterService.createItemMaster(createItemMasterDto);
    }

    @Get()
    async getAllItemMaster() {
        return this.itemMasterService.getAllItemMaster();
    }

    @Get(':item_master_id')
    async getItemMasterById(@Param('item_master_id') item_master_id: string) {
        return this.itemMasterService.getItemMasterById(Number(item_master_id));
    }

}
