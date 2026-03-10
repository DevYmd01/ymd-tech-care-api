import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { SearchVendorDto } from './dto/search-vendor.dto';

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

    @Put(':vendor_id')
    update(@Param('vendor_id') vendor_id: number, @Body() dto: UpdateVendorDto) {
        return this.vendorService.update(vendor_id, dto);
    }

    @Post('search')
    search(@Body() dto: SearchVendorDto) {
        return this.vendorService.search(dto);
    }
}
