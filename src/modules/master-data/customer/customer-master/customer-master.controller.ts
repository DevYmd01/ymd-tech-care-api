import { Controller } from '@nestjs/common';
import { CreateCustomerMasterDto } from './dto/create-customer-master.dto';
// import { UpdateCustomerMasterDto } from './dto/update-customer-master.dto';
import { Body, Get, Param, Post, Patch, Delete, Request} from '@nestjs/common';
import { CustomerMasterService } from './customer-master.service';
import { UpdateCustomerMasterDto } from './dto/update-customer-master.dto';

@Controller('customer-master')
export class CustomerMasterController {
  constructor(private readonly customerMasterService: CustomerMasterService) {}

    @Post()
    async create(@Body() dto: CreateCustomerMasterDto, @Request() req: any) {
        return this.customerMasterService.create(dto, req.context);
    }

    @Get()
    async findAll() {
        return this.customerMasterService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.customerMasterService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateCustomerMasterDto, @Request() req: any) {
        return this.customerMasterService.update(+id, dto, req.context);
    }


    
}
