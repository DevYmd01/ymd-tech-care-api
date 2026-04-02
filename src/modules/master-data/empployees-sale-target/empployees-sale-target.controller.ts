import { Controller } from '@nestjs/common';
import { EmpployeesSaleTargetService } from './empployees-sale-target.service';
import { CreateSaleTargetDto } from './dto/create-sale-target.dto';
import { UpdateSaleTargetDto } from './dto/update-sale-target.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';

@Controller('empployees-sale-target')
export class EmpployeesSaleTargetController {
    constructor(private readonly employeesSaleTargetService: EmpployeesSaleTargetService) { }

    @Post()
    async create(@Body() dto: CreateSaleTargetDto) {
        return this.employeesSaleTargetService.create(dto);
    }   

    @Get()
    async findAll() {
        return this.employeesSaleTargetService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.employeesSaleTargetService.findOne(+id);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateSaleTargetDto) {
        return this.employeesSaleTargetService.update(+id, dto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.employeesSaleTargetService.remove(+id);
    }
}
