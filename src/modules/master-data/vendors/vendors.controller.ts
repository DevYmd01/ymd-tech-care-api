import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorsController {
    constructor(private readonly vendorService: VendorsService) { }

    @Post()
    create(@Body() dto: CreateVendorDto) {
        return this.vendorService.create(dto);
    }

    @Get()
    findAll() {
        return this.vendorService.findAll();
    }

    @Get(':vendor_id')
    findOne(@Param('vendor_id') vendor_id: number) {
        return this.vendorService.findOne(vendor_id);
    }
}
