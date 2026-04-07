import { Controller } from '@nestjs/common';
import { CreateCustomerMasterDto } from './dto/create-customer-master.dto';
// import { UpdateCustomerMasterDto } from './dto/update-customer-master.dto';
import { Body, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { CustomerMasterService } from './customer-master.service';

@Controller('customer-master')
export class CustomerMasterController {
  constructor(private readonly customerMasterService: CustomerMasterService) {}

    @Post()
    async create(@Body() dto: CreateCustomerMasterDto) {
        return this.customerMasterService.create(dto);
    }

    @Get()
    async findAll() {
        return this.customerMasterService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.customerMasterService.findOne(+id);
    }
}
