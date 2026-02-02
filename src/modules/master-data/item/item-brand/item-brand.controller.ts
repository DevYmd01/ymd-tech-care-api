import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ItemBrandService } from './item-brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('item-brand')
export class ItemBrandController {
    constructor(private readonly itemBrandService: ItemBrandService) { }

    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.itemBrandService.create(createBrandDto);
    }

    @Get()
    findAll() {
        return this.itemBrandService.findAll();
    }

    @Get(':item_brand_id')
    findOne(@Param('item_brand_id') item_brand_id: string) {
        return this.itemBrandService.findOne(+item_brand_id);
    }

    @Put(':item_brand_id')
    update(@Param('item_brand_id') item_brand_id: string, @Body() updateBrandDto: CreateBrandDto) {
        return this.itemBrandService.update(+item_brand_id, updateBrandDto);
    }

    @Delete(':item_brand_id')
    remove(@Param('item_brand_id') item_brand_id: string) {
        return this.itemBrandService.remove(+item_brand_id);
    }

}
