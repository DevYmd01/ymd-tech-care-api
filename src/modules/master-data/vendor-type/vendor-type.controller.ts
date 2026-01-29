import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { VendorTypeService } from './vendor-type.service';
import { CreateVendorTypeDTO } from './dto/create-vendor-type.dto';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';

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
}
