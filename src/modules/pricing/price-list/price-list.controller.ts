import { Controller, Patch } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { CreatePriceListHeaderDto } from './dto/create-price-list-header.dto';
import { UpdatePriceListHeaderDto } from './dto/update-price-list-header.dto';
import { Body, Post, Request, Get, Param} from '@nestjs/common';
import path from 'path';

@Controller('price-list')
export class PriceListController {
    constructor(private readonly priceListService: PriceListService) {}
    @Post()
    create(@Body() createPriceListHeaderDto: CreatePriceListHeaderDto, @Request() req: any ) {
        return this.priceListService.create(createPriceListHeaderDto);
    }

    @Patch(':price_list_header_id')
    update(@Param('price_list_header_id') id: number, @Body() updatePriceListHeaderDto: UpdatePriceListHeaderDto, @Request() req: any) {
        return this.priceListService.update(+id, updatePriceListHeaderDto);
    }

    @Get()
    findAll() {
        return this.priceListService.findAll();
    }

    @Get(':price_list_header_id')
    findOne(@Param('price_list_header_id') id: number) {
        return this.priceListService.findOne(+id);
    }


}
