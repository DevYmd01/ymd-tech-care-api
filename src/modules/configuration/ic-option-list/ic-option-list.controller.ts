import { Controller, Post, Body, Request, Patch, Param, Get, ParseIntPipe} from '@nestjs/common';
import { IcOptionListService } from './ic-option-list.service';
import { CreateICOptionDto } from './dto/create-ic-option-list.dto';
import { UpDateICOptionDto } from './dto/update-ic-option-list.dto';

@Controller('ic-option-list')
export class IcOptionListController {
    constructor(private readonly icOptionListService: IcOptionListService) {}

    @Post()
    create(@Body() createICOptionDto: CreateICOptionDto) {
        return this.icOptionListService.create(createICOptionDto);
    }


    @Get()
    findAll() {
        return this.icOptionListService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.icOptionListService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateICOptionDto: UpDateICOptionDto) {
        return this.icOptionListService.update(+id, updateICOptionDto);
    }

}
