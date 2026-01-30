import { Controller } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { CreateItemCategoryDto } from './dto/create-item-category.dto';
import { Post, Body, Get, Param, Put } from '@nestjs/common';

@Controller('item-category')
export class ItemCategoryController {
    constructor(private readonly itemCategoryService: ItemCategoryService) { }

    @Post()
    create(@Body() createItemCategoryDto: CreateItemCategoryDto) {
        return this.itemCategoryService.create(createItemCategoryDto);
    }

    @Get()
    findAll() {
        return this.itemCategoryService.findAll();
    }

    @Get(':item_category_id')
    findOne(@Param('item_category_id') item_category_id: string) {
        return this.itemCategoryService.findOne(+item_category_id);
    }

    @Put(':item_category_id')
    update(@Param('item_category_id') item_category_id: string, @Body() updateItemCategoryDto: CreateItemCategoryDto) {
        return this.itemCategoryService.update(+item_category_id, updateItemCategoryDto);
    }
}
