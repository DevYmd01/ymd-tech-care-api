import { Controller } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { Post, Body, Get, Param } from '@nestjs/common';

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

    @Get(':employee_id')
    findOne(@Param('employee_id') employee_id: number) {
        return this.employeesService.findOne(+employee_id);
    }
}
