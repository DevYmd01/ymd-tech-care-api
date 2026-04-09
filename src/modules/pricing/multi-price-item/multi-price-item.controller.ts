import { Controller } from '@nestjs/common';
import { MultiPriceItemService } from './multi-price-item.service';
import { CreateMultiPriceItemDto } from './dto/create-multi-price-item.dto';
import { Body, Post, Request, Get, Param, Patch } from '@nestjs/common';
import path from 'path';


@Controller('multi-price-item')
export class MultiPriceItemController {
    constructor(private readonly multiPriceItemService: MultiPriceItemService) {}

    @Post()
    create(@Body() createMultiPriceItemDto: CreateMultiPriceItemDto, @Request() req: any ) {
        return this.multiPriceItemService.create(createMultiPriceItemDto);
    }

    @Patch(':multi_price_item_id')
    update(@Param('multi_price_item_id') id: number, @Body() createMultiPriceItemDto: CreateMultiPriceItemDto, @Request() req: any) {
        return this.multiPriceItemService.update(+id, createMultiPriceItemDto);
    }
    
    @Get(':multi_price_item_id')
    findOne(@Param('multi_price_item_id') id: number) {
        return this.multiPriceItemService.findOne(+id);
    }

    @Get()
    findAll() {
        return this.multiPriceItemService.findAll();
    }

}
