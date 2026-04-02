import { Controller } from '@nestjs/common';
import { EmployeesSalePeriodService } from './employees-sale-period.service';
import { CreateSalePeriodDto } from './dto/create-sale-period.dto';
import { UpdateSalePeriodDto } from './dto/update-sale-period.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';


@Controller('employees-sale-period')
export class EmployeesSalePeriodController {
    constructor(private readonly employeesSalePeriodService: EmployeesSalePeriodService) { }

    @Post()
    async create(@Body() dto: CreateSalePeriodDto) {
        return this.employeesSalePeriodService.create(dto);
    }

    @Get()
    async findAll() {
        return this.employeesSalePeriodService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.employeesSalePeriodService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateSalePeriodDto) {
        return this.employeesSalePeriodService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.employeesSalePeriodService.remove(+id);
    }

}
