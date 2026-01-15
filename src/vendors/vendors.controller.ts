import { Controller, Post, Body } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorsController {

    constructor(private readonly vendorsService: VendorsService) { }

    @Post()
    create(@Body() dto: CreateVendorDto) {
        return this.vendorsService.create(dto);
    }
}
