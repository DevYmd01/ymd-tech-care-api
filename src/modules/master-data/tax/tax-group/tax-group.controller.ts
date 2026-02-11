import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { TaxGroupService } from './tax-group.service';
import { CreateTaxGroupDTO } from './dto/create-tax-group.dto';

@Controller('tax-group')
export class TaxGroupController {
    constructor(private readonly taxGroupService: TaxGroupService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTaxGroupDTO: CreateTaxGroupDTO) {
        return this.taxGroupService.create(createTaxGroupDTO);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return this.taxGroupService.findAll();
    }

    @Get(':tax_group_id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('tax_group_id') tax_group_id: string) {
        return this.taxGroupService.findById(tax_group_id);
    }

    @Put(':tax_group_id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('tax_group_id') tax_group_id: string, @Body() updateTaxGroupDTO: CreateTaxGroupDTO) {
        return this.taxGroupService.update(tax_group_id, updateTaxGroupDTO);
    }
}
