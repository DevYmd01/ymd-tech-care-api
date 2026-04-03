import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { CreateCustomerTypeDto } from './dto/create-customer-type.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-type.dto';
import { CustomerTypeService } from './customer-type.service';

@Controller('customer-type')
export class CustomerTypeController {
    constructor(private readonly customerTypeService: CustomerTypeService) {}
    @Post()
    async create(@Body() dto: CreateCustomerTypeDto) {
        return this.customerTypeService.create(dto);
    }
    @Get()
    async findAll() {
        return this.customerTypeService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.customerTypeService.findOne(+id);
    }   
    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCustomerTypeDto) {
        return this.customerTypeService.update(+id, dto);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.customerTypeService.remove(+id);
    }
}
