import { Controller, Post, Body, Get, Param, Put, Patch, Query } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto, UpdateVendorStatusDto, CreateVendorPerformanceDto } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorsController {

    constructor(private readonly vendorsService: VendorsService) { }

    /// สร้างเจ้าหนี้ 
    @Post()
    create(@Body() dto: CreateVendorDto) {
        return this.vendorsService.create(dto);
    }

    /// ดึงข้อมูลเจ้าหนี้
    @Get()
    findAll(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return this.vendorsService.findAll(page, limit);
    }


    /// ดึงข้อมูลเจ้าหนี้ตามรหัส
    @Get(':vendor_id')
    findOne(@Param('vendor_id') vendor_id: string) {
        return this.vendorsService.findOne(+vendor_id);
    }

    /// อัปเดตข้อมูลเจ้าหนี้ตามรหัส
    @Put(':vendor_id')
    update(@Param('vendor_id') vendor_id: string, @Body() dto: CreateVendorDto) {
        return this.vendorsService.update(+vendor_id, dto);
    }

    @Patch(':vendor_id/status')
    async updateStatus(
        @Param('vendor_id') vendor_id: string,
        @Body() dto: UpdateVendorStatusDto,
    ) {
        await this.vendorsService.updateStatus(+vendor_id, dto);
        return { message: 'Vendor status updated successfully' };
    }

    /// สร้างบันทึกผลการประเมินเจ้าหนี้
    @Post(':vendor_id/performance')
    createVendorPerformance(@Param('vendor_id') vendor_id: string, @Body() dto: CreateVendorPerformanceDto) {
        return this.vendorsService.createVendorPerformance(+vendor_id, dto);
    }

    /// ดึงข้อมูลผลการประเมินเจ้าหนี้ตามรหัส
    @Get(':vendor_id/performance')
    getVendorPerformance(@Param('vendor_id') vendor_id: string) {
        return this.vendorsService.getVendorPerformance(+vendor_id);
    }




}


