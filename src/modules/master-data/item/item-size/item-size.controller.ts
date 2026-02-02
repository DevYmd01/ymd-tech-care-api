import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemSizeService } from './item-size.service';
import { CreateItemSizeDto } from './dto/create-item-size.dto';

@Controller('item-size')
export class ItemSizeController {
    constructor(private readonly itemSizeService: ItemSizeService) { }

    @Post()
    create(@Body() createItemSizeDto: CreateItemSizeDto) {
        return this.itemSizeService.create(createItemSizeDto);
    }

    @Get()
    findAll() {
        return this.itemSizeService.findAll();
    }

    @Get(':item_size_id')
    findOne(@Param('item_size_id') item_size_id: string) {
        return this.itemSizeService.findOne(+item_size_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':item_size_id')
    update(@Param('item_size_id') item_size_id: string, @Body() updateItemSizeDto: CreateItemSizeDto) {
        return this.itemSizeService.update(+item_size_id, updateItemSizeDto);
    }

    @Delete(':item_size_id')
    remove(@Param('item_size_id') item_size_id: string) {
        return this.itemSizeService.remove(+item_size_id);
    }

}
