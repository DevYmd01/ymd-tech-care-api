import { Controller } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) { }

    @Get()
    findAll() {
        return this.currencyService.findAll();
    }

    @Post()
    create(@Body() createCurrencyDto: CreateCurrencyDto) {
        return this.currencyService.create(createCurrencyDto);
    }

    @Get(':currency_id')
    findOne(@Param('currency_id') currency_id: string) {
        return this.currencyService.findOne(+currency_id);
    }

    @Put(':currency_id')
    update(@Param('currency_id') currency_id: string, @Body() updateCurrencyDto: CreateCurrencyDto) {
        return this.currencyService.update(+currency_id, updateCurrencyDto);
    }
}
