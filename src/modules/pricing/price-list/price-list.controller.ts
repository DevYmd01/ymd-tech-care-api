import { Controller } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { CreatePriceListHeaderDto } from './dto/create-price-list-header.dto';
import { Body, Post, Request, Get } from '@nestjs/common';

@Controller('price-list')
export class PriceListController {
    constructor(private readonly priceListService: PriceListService) {}
    @Post()
    create(@Body() createPriceListHeaderDto: CreatePriceListHeaderDto, @Request() req: any ) {
        return this.priceListService.create(createPriceListHeaderDto);
    }

    @Get()
    findAll() {
        return this.priceListService.findAll();
    }
}
