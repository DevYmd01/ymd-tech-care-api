import { Controller } from '@nestjs/common';
import { InventoryOptionService } from './inventory-option.service';
import { CreateInventoryOptionDto } from './dto/create-inventory-option.dto';
import { UpdateInventoryOptionDto } from './dto/update-inventory-option.dto';
import { Body, Post, Request, Get, Param, Patch } from '@nestjs/common';

@Controller('inventory-option')
export class InventoryOptionController {
    constructor(private readonly inventoryOptionService: InventoryOptionService) {}

    @Post()
    create(@Body() createInventoryOptionDto: CreateInventoryOptionDto, @Request() req: any ) {
        return this.inventoryOptionService.create(createInventoryOptionDto);
    }

    @Get()
    findAll() {
        return this.inventoryOptionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.inventoryOptionService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateInventoryOptionDto: UpdateInventoryOptionDto, @Request() req: any) {
        return this.inventoryOptionService.update(+id, updateInventoryOptionDto);
    }
}
