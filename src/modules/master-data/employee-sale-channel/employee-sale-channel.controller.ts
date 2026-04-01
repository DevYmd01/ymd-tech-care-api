import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { EmployeeSaleChannelService } from './employee-sale-channel.service';
import { CreateSaleChannelDto } from './dto/creact-sale-channel.dto';
import { UpdateSaleChannelDto } from './dto/update-sale-channel.dto';

@Controller('employee-sale-channel')
export class EmployeeSaleChannelController {
    constructor(private readonly employeeSaleChannelService: EmployeeSaleChannelService) {}
    @Post()
    async create(@Body() dto: CreateSaleChannelDto) {
        return this.employeeSaleChannelService.create(dto);
    }
    @Get()
    async findAll() {
        return this.employeeSaleChannelService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.employeeSaleChannelService.findOne(+id);
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateSaleChannelDto) {
        return this.employeeSaleChannelService.update(+id, dto);
    }   
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.employeeSaleChannelService.remove(+id);
    }
}
