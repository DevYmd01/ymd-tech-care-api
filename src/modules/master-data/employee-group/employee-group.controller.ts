import { Controller, Post, Body, Get, Param, Patch, Delete  } from '@nestjs/common';
import { EmployeeGroupService } from './employee-group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';


@Controller('employee-group')
export class EmployeeGroupController {
    constructor(private readonly employeeGroupService: EmployeeGroupService) { }

    @Post()
    async create(@Body() dto: CreateGroupDto) {
        return this.employeeGroupService.create(dto);
    }

    @Get()
    async findAll() {
        return this.employeeGroupService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.employeeGroupService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
        return this.employeeGroupService.update(+id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.employeeGroupService.remove(+id);
    }

    // async create(dto: CreateGroupDto) {
    //     // Implement the logic to create an employee group
    // }

    // async findAll() {
    //     // Implement the logic to retrieve all employee groups
    // }

    // async findOne(id: number) {
    //     // Implement the logic to retrieve an employee group by ID
    // }

    // async update(id: number, dto: UpdateGroupDto) {
    //     // Implement the logic to update an employee group by ID
    // }

    // async remove(id: number) {
    //     // Implement the logic to delete an employee group by ID
    // }
}
