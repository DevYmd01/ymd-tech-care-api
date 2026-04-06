import { Controller } from '@nestjs/common';
import { CreateBusinessTypeDto } from './dto/create-business-type.dto';
import { UpdateBusinessTypeDto } from './dto/update-business-type.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { BusinessTypeService } from './business-type.service';

@Controller('business-type')
export class BusinessTypeController {
    constructor(private readonly businessTypeService: BusinessTypeService) { }

    @Post()
    async create(@Body() dto: CreateBusinessTypeDto) {
        return this.businessTypeService.create(dto);
    }

    @Get()
    async findAll() {
        return this.businessTypeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.businessTypeService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateBusinessTypeDto) {
        return this.businessTypeService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.businessTypeService.remove(+id);
    }
}
