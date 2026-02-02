import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemDesignService } from './item-design.service';
import { CreateDesignDto } from './dto/create-design.dto';

@Controller('item-design')
export class ItemDesignController {
    constructor(private readonly itemDesignService: ItemDesignService) { }

    @Post()
    create(@Body() createDesignDto: CreateDesignDto) {
        return this.itemDesignService.create(createDesignDto);
    }

    @Get()
    findAll() {
        return this.itemDesignService.findAll();
    }

    @Get(':item_design_id')
    findOne(@Param('item_design_id') item_design_id: string) {
        return this.itemDesignService.findOne(+item_design_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':item_design_id')
    update(@Param('item_design_id') item_design_id: string, @Body() updateDesignDto: CreateDesignDto) {
        return this.itemDesignService.update(+item_design_id, updateDesignDto);
    }

    @Delete(':item_design_id')
    remove(@Param('item_design_id') item_design_id: string) {
        return this.itemDesignService.remove(+item_design_id);
    }

}
