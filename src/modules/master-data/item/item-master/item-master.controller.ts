import { Controller } from '@nestjs/common';
import { ItemMasterService } from './item-master.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { UpdateItemMasterDto } from './dto/update-item-master.dto';
import { ItemBarcodeService } from '../item-barcode/item-barcode.service';

@Controller('item-master')
export class ItemMasterController {
    constructor(private readonly itemMasterService: ItemMasterService
        , private readonly itemBarcodeService: ItemBarcodeService
    ) { }

    @Post()
    async create(@Body() createItemMasterDto: CreateItemMasterDto) {
        return this.itemMasterService.create(createItemMasterDto);
    }

    @Patch(':item_id')
    async update(@Param('item_id') item_id: string, @Body() updateItemMasterDto: UpdateItemMasterDto) {
        return this.itemMasterService.updateItemMaster(Number(item_id), updateItemMasterDto);
    }

    @Get()
    async getAllItemMaster() {
        return this.itemMasterService.getAll();
    }

    @Get(':item_master_id')
    async getById(@Param('item_master_id') item_master_id: string) {
        return this.itemMasterService.getById(Number(item_master_id));
    }

    @Delete(':item_master_id')
    async delete(@Param('item_master_id') item_master_id: string) {
        return this.itemMasterService.delete(Number(item_master_id));
    }
}
