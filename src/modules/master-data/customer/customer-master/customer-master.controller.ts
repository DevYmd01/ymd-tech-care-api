import { Controller } from '@nestjs/common';
import { CreateCustomerMasterDto } from './dto/create-customer-master.dto';
// import { UpdateCustomerMasterDto } from './dto/update-customer-master.dto';
import { Body, Get, Param, Post, Patch, Delete, Request} from '@nestjs/common';
import { CustomerMasterService } from './customer-master.service';
import { UpdateCustomerMasterDto } from './dto/update-customer-master.dto';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer-master')
@UseGuards(AuthGuard('jwt'))
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

    @Get('customer-address/:customerID')
    async findCustomerAddress(@Param('customerID') customerID: string) {
        return this.customerMasterService.findCustomerAddress(+customerID);
    }


    
}
