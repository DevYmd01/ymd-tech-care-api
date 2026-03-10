import { Controller } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

@Controller('org-department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Post()
    create(@Body() dto: CreateDepartmentDto) {
        return this.departmentService.create(dto);
    }

    @Get()
    findAll() {
        return this.departmentService.findAll();
    }

    @Get(':department_id')
    findOne(@Param('department_id') department_id: number) {
        return this.departmentService.findOne(+department_id);
    }

    @Put(':department_id')
    update(@Param('department_id') department_id: number, @Body() dto: CreateDepartmentDto) {
        return this.departmentService.update(+department_id, dto);
    }

    @Delete(':department_id')
    delete(@Param('department_id') department_id: number) {
        return this.departmentService.delete(+department_id);
    }
}
