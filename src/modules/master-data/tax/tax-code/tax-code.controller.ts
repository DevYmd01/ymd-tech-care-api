import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { TaxCodeService } from './tax-code.service';
import { CreateTaxCodeDTO } from './dto/create-tax-code.dto';

@Controller('tax-code')
export class TaxCodeController {
    constructor(private readonly taxCodeService: TaxCodeService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTaxCodeDTO: CreateTaxCodeDTO) {
        return this.taxCodeService.create(createTaxCodeDTO);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.taxCodeService.findAll();
    }

    @Get(':tax_code_id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('tax_code_id') tax_code_id: string) {
        return this.taxCodeService.findById(tax_code_id);
    }

    @Put(':tax_code_id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('tax_code_id') tax_code_id: string, @Body() updateTaxCodeDTO: CreateTaxCodeDTO) {
        return this.taxCodeService.update(tax_code_id, updateTaxCodeDTO);
    }
}
