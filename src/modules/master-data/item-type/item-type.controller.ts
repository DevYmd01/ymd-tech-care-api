import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDTO } from './dto/cerate-item-type.dto';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';

@Controller('item-type')
export class ItemTypeController {

    constructor(private readonly itemTypeService: ItemTypeService) { }

    @Get()
    findAll() {
        return this.itemTypeService.findAll();
    }

    @Get(':item_type_id')
    findOne(@Param('item_type_id') item_type_id: string) {
        return this.itemTypeService.findOne(+item_type_id);
    }

    @Post()
    create(@Body() createItemTypeDTO: CreateItemTypeDTO) {
        return this.itemTypeService.create(createItemTypeDTO);
    }

    @Put(':item_type_id')
    update(@Param('item_type_id') item_type_id: string, @Body() updateItemTypeDTO: CreateItemTypeDTO) {
        return this.itemTypeService.update(+item_type_id, updateItemTypeDTO);
    }
}
