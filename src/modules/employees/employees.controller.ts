import { Controller } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import { Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    create(@Body() dto: CreateEmployeesDto) {
        return this.employeesService.create(dto);
    }

    @Get()
    findAll() {
        return this.employeesService.findAll();
    }

    // แสดงข้อมูลพนักงานขายทั้งหมดเท่านั้น
    @Get('emp-sale-all')
    findAllSale() {
        return this.employeesService.findAllSale();
    }

    @Patch(':employee_id')
    update(@Param('employee_id') employee_id: number, @Body() dto: UpdateEmployeesDto) {
        return this.employeesService.update(+employee_id, dto);
    }

    @Get(':employee_id')
    findOne(@Param('employee_id') employee_id: number) {
        return this.employeesService.findOne(+employee_id);
    }



}
