import { Controller, Patch, Post, Body, Get, Param, Delete} from '@nestjs/common';
import { EmployeeSideService } from './employee-side.service';
import { CreateEmployeeSideDto } from './dto/create-employee-side.dto';


@Controller('employee-side')
export class EmployeeSideController {
    constructor(private readonly employeeSideService: EmployeeSideService) { }

    @Post()
    create(@Body() dto: CreateEmployeeSideDto) {
        return this.employeeSideService.create(dto);
    }

    @Get()
    findAll() {
        return this.employeeSideService.findAll();
    }

    @Get(':emp_side_id')
    findOne(@Param('emp_side_id') emp_side_id: number) {
        return this.employeeSideService.findOne(+emp_side_id);
    }

    @Patch(':emp_side_id')
    update(@Param('emp_side_id') emp_side_id: number, @Body() dto: CreateEmployeeSideDto) {
        return this.employeeSideService.update(+emp_side_id, dto);
    }

    @Delete(':emp_side_id')
    delete(@Param('emp_side_id') emp_side_id: number) {
        return this.employeeSideService.delete(+emp_side_id);
    }
}
