import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemPatternService } from './item-pattern.service';
import { CreatePatternDto } from './dto/create-pattern.dto';

@Controller('item-pattern')
export class ItemPatternController {
    constructor(private readonly itemPatternService: ItemPatternService) { }

    @Post()
    create(@Body() createPatternDto: CreatePatternDto) {
        return this.itemPatternService.create(createPatternDto);
    }

    @Get()
    findAll() {
        return this.itemPatternService.findAll();
    }

    @Get(':item_pattern_id')
    findOne(@Param('item_pattern_id') item_pattern_id: string) {
        return this.itemPatternService.findOne(+item_pattern_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':item_pattern_id')
    update(@Param('item_pattern_id') item_pattern_id: string, @Body() updatePatternDto: CreatePatternDto) {
        return this.itemPatternService.update(+item_pattern_id, updatePatternDto);
    }

    @Delete(':item_pattern_id')
    remove(@Param('item_pattern_id') item_pattern_id: string) {
        return this.itemPatternService.remove(+item_pattern_id);
    }

}
