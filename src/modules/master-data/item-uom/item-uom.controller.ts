import { Controller } from '@nestjs/common';
import { ItemUomService } from './item-uom.service';
import { Body, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateItemUomDto } from './dto/item-uom.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('item-uom')
export class ItemUomController {
    constructor(private readonly itemUomService: ItemUomService) { }

    // CRUD operations for Item UOM
    @Post()
    async createItemUom(@Body() createItemUomDto: CreateItemUomDto) {
        return this.itemUomService.createItemUom(createItemUomDto);
    }

    // แสดงรายการทั้งหมดของ Item UOM
    @Get()
    async getAllItemUom() {
        return this.itemUomService.getAllItemUom();
    }

    // แสดงรายละเอียดของ Item UOM ตาม ID
    @Get(':item_uom_id')
    async getItemUomById(@Param('item_uom_id') item_uom_id: string) {
        return this.itemUomService.getItemUomById(Number(item_uom_id));
    }

    // อัปเดตรายละเอียดของ Item UOM ตาม ID
    @Patch(':item_uom_id')
    async updateItemUom(@Param('item_uom_id') item_uom_id: string, @Body() updateItemUomDto: CreateItemUomDto) {
        return this.itemUomService.updateItemUom(Number(item_uom_id), updateItemUomDto);
    }

    // แสดงรายการ Item UOM ตาม Item ID
    @Get('item/:item_id')
    async getItemUomByItemId(@Param('item_id') item_id: string) {
        return this.itemUomService.getItemUomByItemId(Number(item_id));
    }

    // แสดงรายการ Item UOM พร้อมข้อมูล UOM ตาม Item ID
    @Get('/items/:item_id/uoms')
    async getItemByItemIdUoms(@Param('item_id') item_id: string) {
        return this.itemUomService.getItemByItemIdUoms(Number(item_id));
    }
}
