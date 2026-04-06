import { Controller } from '@nestjs/common';
import { CreateBillGroupDto } from './dto/create-bill-group.dto';
import { UpdateBillGroupDto } from './dto/update-bill-group.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { BillGroupService } from './bill-group.service';

@Controller('bill-group')
export class BillGroupController {
    constructor(private readonly billGroupService: BillGroupService) { }
    @Post()
    async create(@Body() dto: CreateBillGroupDto) {
        return this.billGroupService.create(dto);
    }
    @Get()
    async findAll() {
        return this.billGroupService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.billGroupService.findOne(+id);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateBillGroupDto) {
        return this.billGroupService.update(+id, dto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.billGroupService.remove(+id);
    }
    
}
