import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemGradeService } from './item-grade.service';
import { CreateItemGradeDto } from './dto/create-item-grade.dto';

@Controller('item-grade')
export class ItemGradeController {
    constructor(private readonly itemGradeService: ItemGradeService) { }

    @Post()
    create(@Body() createItemGradeDto: CreateItemGradeDto) {
        return this.itemGradeService.create(createItemGradeDto);
    }

    @Get()
    findAll() {
        return this.itemGradeService.findAll();
    }

    @Get(':item_grade_id')
    findOne(@Param('item_grade_id') item_grade_id: string) {
        return this.itemGradeService.findOne(+item_grade_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':item_grade_id')
    update(@Param('item_grade_id') item_grade_id: string, @Body() updateItemGradeDto: CreateItemGradeDto) {
        return this.itemGradeService.update(+item_grade_id, updateItemGradeDto);
    }

    @Delete(':item_grade_id')
    remove(@Param('item_grade_id') item_grade_id: string) {
        return this.itemGradeService.remove(+item_grade_id);
    }

}
