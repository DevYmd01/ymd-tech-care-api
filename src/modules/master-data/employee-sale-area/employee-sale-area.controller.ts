import { Controller, Post, Body, Get, Param, Put, Delete  } from '@nestjs/common';
import { EmployeeSaleAreaService } from './employee-sale-area.service';
import { CreateSaleAreaDto } from './dto/create-sale-area.dto';
import { UpdateSaleAreaDto } from './dto/update-sale-area.dto';

@Controller('employee-sale-area')
export class EmployeeSaleAreaController {
    constructor(private readonly employeeSaleAreaService: EmployeeSaleAreaService) {}

    @Post()
    async create(@Body() dto: CreateSaleAreaDto) {
        return this.employeeSaleAreaService.create(dto);
    }
    @Get()
    async findAll() {
        return this.employeeSaleAreaService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.employeeSaleAreaService.findOne(+id);
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateSaleAreaDto) {
        return this.employeeSaleAreaService.update(+id, dto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.employeeSaleAreaService.remove(+id);
    }
}
