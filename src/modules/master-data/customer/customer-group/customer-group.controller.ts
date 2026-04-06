import { Controller } from '@nestjs/common';
import { CreateCustomerGroupDto } from './dto/create-customer-group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';

@Controller('customer-group')
export class CustomerGroupController {
    constructor(private readonly customerGroupService: CustomerGroupService) { }
    @Post()
    async create(@Body() dto: CreateCustomerGroupDto) {
        return this.customerGroupService.create(dto);
    }   
    @Get()
    async findAll() {
        return this.customerGroupService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.customerGroupService.findOne(+id);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCustomerGroupDto) {
        return this.customerGroupService.update(+id, dto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.customerGroupService.remove(+id);
    }
}
