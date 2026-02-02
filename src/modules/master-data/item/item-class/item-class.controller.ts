import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemClassService } from './item-class.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('item-class')
export class ItemClassController {
    constructor(private readonly itemClassService: ItemClassService) { }

    @Post()
    create(@Body() createClassDto: CreateClassDto) {
        return this.itemClassService.create(createClassDto);
    }

    @Get()
    findAll() {
        return this.itemClassService.findAll();
    }

    @Get(':item_class_id')
    findOne(@Param('item_class_id') item_class_id: string) {
        return this.itemClassService.findOne(+item_class_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':item_class_id')
    update(@Param('item_class_id') item_class_id: string, @Body() updateClassDto: CreateClassDto) {
        return this.itemClassService.update(+item_class_id, updateClassDto);
    }

    @Delete(':item_class_id')
    remove(@Param('item_class_id') item_class_id: string) {
        return this.itemClassService.remove(+item_class_id);
    }

}
