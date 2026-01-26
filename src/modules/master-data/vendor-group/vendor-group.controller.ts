import { Controller, Get } from '@nestjs/common';
import { VendorGroupService } from './vendor-group.service';

@Controller('vendor-group')
export class VendorGroupController {
    constructor(private readonly vendorGroupService: VendorGroupService) { }

    @Get()
    findAll() {
        return this.vendorGroupService.findAll();
    }
}
