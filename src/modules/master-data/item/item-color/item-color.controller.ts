import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemColorService } from './item-color.service';
import { CreateItemColorDto } from './dto/create-item-color.dto';

@Controller('item-color')
export class ItemColorController {
    constructor(private readonly itemColorService: ItemColorService) { }

    @Post()
    create(@Body() createItemColorDto: CreateItemColorDto) {
        return this.itemColorService.create(createItemColorDto);
    }

    @Get()
    findAll() {
        return this.itemColorService.findAll();
    }

    @Get(':item_color_id')
    findOne(@Param('item_color_id') item_color_id: string) {
        return this.itemColorService.findOne(+item_color_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':item_color_id')
    update(@Param('item_color_id') item_color_id: string, @Body() updateItemColorDto: CreateItemColorDto) {
        return this.itemColorService.update(+item_color_id, updateItemColorDto);
    }

    @Delete(':item_color_id')
    remove(@Param('item_color_id') item_color_id: string) {
        return this.itemColorService.remove(+item_color_id);
    }

}
