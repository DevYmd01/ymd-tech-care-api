import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { VendorTypeService } from './vendor-type.service';
import { CreateVendorTypeDTO } from './dto/create-vendor-type.dto';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateVendorTypeDTO } from './dto/update-vendor-type.dto';

@Controller('vendor-type')
export class VendorTypeController {

    constructor(private readonly vendorTypeService: VendorTypeService) { }

    @Get()
    findAll() {
        return this.vendorTypeService.findAll();
    }

    @Post()
    create(@Body() createVendorTypeDTO: CreateVendorTypeDTO) {
        return this.vendorTypeService.create(createVendorTypeDTO);
    }

    @Put(':vendor_type_id')
    update(@Param('vendor_type_id') vendor_type_id: string, @Body() updateVendorTypeDTO: UpdateVendorTypeDTO) {
        return this.vendorTypeService.update(+vendor_type_id, updateVendorTypeDTO);
    }
}
