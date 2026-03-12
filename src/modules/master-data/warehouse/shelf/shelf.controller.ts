import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateShelfDto } from './dto/create-shelf.dto';


@Controller('shelf')
export class ShelfController {
    constructor(private readonly ShelfService: ShelfService) { }

    @Post()
    create(@Body() createShelfDto: CreateShelfDto) {
        return this.ShelfService.create(createShelfDto);
    }

    @Get()
    findAll() {
        return this.ShelfService.findAll();
    }

    @Get(':shelf_id')
    findOne(@Param('shelf_id') shelf_id: string) {
        return this.ShelfService.findOne(+shelf_id);
    }

    /// อัพเดทข้อมูล
    @Patch(':shelf_id')
    update(@Param('shelf_id') shelf_id: string, @Body() updateShelfDto: CreateShelfDto) {
        return this.ShelfService.update(+shelf_id, updateShelfDto);
    }

    @Delete(':shelf_id')
    remove(@Param('shelf_id') shelf_id: string) {
        return this.ShelfService.remove(+shelf_id);
    }

}
