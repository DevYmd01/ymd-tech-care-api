import { Controller } from '@nestjs/common';
import { OrgPositionService } from './org-position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Post, Body, Get, Param, Put } from '@nestjs/common';
import { UpdatePositionDto } from './dto/update-positon.dto';

@Controller('org-position')
export class OrgPositionController {
    constructor(private readonly orgPositionService: OrgPositionService) { }

    @Post()
    create(@Body() dto: CreatePositionDto) {
        return this.orgPositionService.create(dto);
    }

    @Get()
    findAll() {
        return this.orgPositionService.findAll();
    }

    @Get(':position_id')
    findOne(@Param('position_id') position_id: number) {
        return this.orgPositionService.findOne(+position_id);
    }

    @Put(':position_id')
    update(@Param('position_id') position_id: number, @Body() dto: UpdatePositionDto) {
        return this.orgPositionService.update(+position_id, dto);
    }
}
