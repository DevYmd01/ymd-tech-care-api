import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { VendorTypeService } from './vendor-type.service';

@Controller('vendor-type')
export class VendorTypeController {

    constructor(private readonly vendorTypeService: VendorTypeService) { }

    @Get()
    findAll() {
        return this.vendorTypeService.findAll();
    }
}
