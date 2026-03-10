import { Controller } from '@nestjs/common';
import { UomService } from './uom.service';
import { Body, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateUomDto } from './dto/creat-uom.dto';

@Controller('uom')
export class UomController {
    constructor(private readonly uomService: UomService) { }

    @Post()
    async createUom(@Body() createUomDto: CreateUomDto) {
        return this.uomService.createUom(createUomDto);
    }

    @Get()
    async getAllUom() {
        return this.uomService.getAllUom();
    }

    @Get(':uom_id')
    async getUomById(@Param('uom_id') uom_id: string) {
        return this.uomService.getUomById(Number(uom_id));
    }

    @Patch(':uom_id')
    async updateUom(@Param('uom_id') uom_id: string, @Body() updateUomDto: CreateUomDto) {
        return this.uomService.updateUom(Number(uom_id), updateUomDto);
    }

    @Delete(':uom_id')
    async deleteUom(@Param('uom_id') uom_id: string) {
        return this.uomService.deleteUom(Number(uom_id));
    }
}
