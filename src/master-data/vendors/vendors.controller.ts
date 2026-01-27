import { Controller, Post, Body, Get, Param, Put, Patch, Query } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import {
    CreateVendorDto,
    UpdateVendorStatusDto,
    CreateVendorPerformanceDto,
    CreateVendorContactDto,
    CreateVendorBankAccountDto
} from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

/**
 * VendorsController
 * ----------------
 * หน้าที่:
 * - รับ request
 * - ส่งต่อให้ service
 * - ❌ ไม่มี logic
 */

@Controller('vendors-master-data')
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
        return this.vendorsService.findAll(
            page ? Number(page) : 1,
            limit ? Number(limit) : 10,
        );
    }

    /// ดึงข้อมูลเจ้าหนี้ตามรหัส
    @Get(':vendor_id')
    findOne(
        @Param('vendor_id') vendor_id: string,
    ) {
        return this.vendorsService.findOne(+vendor_id);
    }

    /// อัปเดตข้อมูลเจ้าหนี้ตามรหัส
    @Put(':vendor_id')
    updateVendor(
        @Param('vendor_id') vendor_id: string,
        @Body() dto: UpdateVendorDto,
    ) {
        return this.vendorsService.updateVendor(+vendor_id, dto);
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

    /// สร้างผู้ติดต่อ
    @Post(':vendor_id/contacts')
    createVendorContact(@Param('vendor_id') vendor_id: string, @Body() dto: CreateVendorContactDto) {
        return this.vendorsService.createVendorContact(+vendor_id, dto);
    }

    /// ดึงข้อมูลผู้ติดต่อตามรหัส
    @Get(':vendor_id/contacts')
    getVendorContact(@Param('vendor_id') vendor_id:
        string) {
        return this.vendorsService.getVendorContact(+vendor_id);
    }

    /// สร้างบัญชีธนาคาร
    @Post(':vendor_id/bank-accounts')
    createVendorBankAccount(@Param('vendor_id') vendor_id: string, @Body() dto: CreateVendorBankAccountDto) {
        return this.vendorsService.createVendorBankAccount(+vendor_id, dto);
    }

}


