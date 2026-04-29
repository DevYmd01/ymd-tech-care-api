import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ItemLotBalanceService } from './item-lot-balance.service';
import { CreateItemLotBalanceDto } from './dto/create-item-lot-balance.dto';
import { UpdateItemLotBalanceDto } from './dto/update-item-lot-balance.dto';


@Controller('item-lot-balance')
export class ItemLotBalanceController {
    constructor(private readonly itemLotBalanceService: ItemLotBalanceService) {}

    @Post()
    create(@Body() createItemLotBalanceDto: CreateItemLotBalanceDto) {
        return this.itemLotBalanceService.create(createItemLotBalanceDto);
    }

    @Get()
    findAll() {
        return this.itemLotBalanceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemLotBalanceService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateItemLotBalanceDto: UpdateItemLotBalanceDto) {
        return this.itemLotBalanceService.update(+id, updateItemLotBalanceDto);
    }

    @Get('item/:item_id')
    findByItem(@Param('item_id') item_id: string) {
        return this.itemLotBalanceService.findByItem(+item_id);
    }
    
}
