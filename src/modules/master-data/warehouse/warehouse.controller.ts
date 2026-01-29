import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) { }

    @Post()
    create(@Body() createWarehouseDto: CreateWarehouseDto) {
        return this.warehouseService.create(createWarehouseDto);
    }

    @Get()
    findAll() {
        return this.warehouseService.findAll();
    }

    @Get(':warehouse_id')
    findOne(@Param('warehouse_id') warehouse_id: number) {
        return this.warehouseService.findOne(warehouse_id);
    }

    @Put(':warehouse_id')
    update(@Param('warehouse_id') warehouse_id: number, @Body() updateWarehouseDto: CreateWarehouseDto) {
        return this.warehouseService.update(warehouse_id, updateWarehouseDto);
    }
}
