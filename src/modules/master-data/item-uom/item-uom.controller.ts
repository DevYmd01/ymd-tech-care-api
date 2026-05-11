import { Controller } from '@nestjs/common';
import { ItemUomService } from './item-uom.service';
import { Body, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateItemUomDto } from './dto/item-uom.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('item-uom')
export class ItemUomController {
    constructor(private readonly itemUomService: ItemUomService) { }

    @Post()
    async createItemUom(@Body() createItemUomDto: CreateItemUomDto) {
        return this.itemUomService.createItemUom(createItemUomDto);
    }

    @Get()
    async getAllItemUom() {
        return this.itemUomService.getAllItemUom();
    }

    @Get(':item_uom_id')
    async getItemUomById(@Param('item_uom_id') item_uom_id: string) {
        return this.itemUomService.getItemUomById(Number(item_uom_id));
    }

    @Patch(':item_uom_id')
    async updateItemUom(@Param('item_uom_id') item_uom_id: string, @Body() updateItemUomDto: CreateItemUomDto) {
        return this.itemUomService.updateItemUom(Number(item_uom_id), updateItemUomDto);
    }

    @Get('item/:item_id')
    async getItemUomByItemId(@Param('item_id') item_id: string) {
        return this.itemUomService.getItemUomByItemId(Number(item_id));
    }
}
