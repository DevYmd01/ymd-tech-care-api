import { Controller } from '@nestjs/common';
import { CreateBillGruopDto } from './dto/create-bill-gruop.dto';
import { UpdateBillGruopDto } from './dto/update-bill-gruop.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { BillGruopService } from './bill-gruop.service';

@Controller('bill-gruop')
export class BillGruopController {
    constructor(private readonly billGruopService: BillGruopService) { }
    @Post()
    async create(@Body() dto: CreateBillGruopDto) {
        return this.billGruopService.create(dto);
    }
    @Get()
    async findAll() {
        return this.billGruopService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.billGruopService.findOne(+id);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateBillGruopDto) {
        return this.billGruopService.update(+id, dto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.billGruopService.remove(+id);
    }
}
