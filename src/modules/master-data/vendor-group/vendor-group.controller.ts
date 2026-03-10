import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { VendorGroupService } from './vendor-group.service';
import { CreateVendorGroupDTO } from './dto/creacte-gruop.dto';

@Controller('vendor-group')
export class VendorGroupController {
    constructor(private readonly vendorGroupService: VendorGroupService) { }

    @Get()
    findAll() {
        return this.vendorGroupService.findAll();
    }

    @Get(':vendor_group_id')
    findOne(@Param('vendor_group_id') vendor_group_id: string) {
        return this.vendorGroupService.findOne(+vendor_group_id);
    }

    @Post()
    create(@Body() createVendorGroupDTO: CreateVendorGroupDTO) {
        return this.vendorGroupService.create(createVendorGroupDTO);
    }

    @Put(':vendor_group_id')
    update(@Param('vendor_group_id') vendor_group_id: string, @Body() updateVendorGroupDTO: CreateVendorGroupDTO) {
        return this.vendorGroupService.update(+vendor_group_id, updateVendorGroupDTO);
    }
}
