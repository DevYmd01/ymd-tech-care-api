import { Controller, Get, Body, Post, Param, Request, Patch, Query } from '@nestjs/common';
import { QcService } from './qc.service';
import { CreateQcHeaderDTO } from './dto/create-qc-header.dto';
import { UpdateQcHeaderDTO } from './dto/update-qc-header.dto';

@Controller('qc')
export class QcController {

    constructor(private readonly qcService: QcService) { }

    @Get('pr/waiting-for-qc')
    findPRWithoutQC(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.qcService.findPRWithoutQC(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

    @Get('rfq/waiting-for-qc')
    findRFQWithoutQC(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.qcService.findRFQWithoutQC(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

    // แสดงเพื่อเลือก vender
    @Get('vendor/:rfq_id/waiting-for-qc')
    findVendorWithoutQCByRFQId(
        @Param('rfq_id') rfq_id: string,
    ) {
        return this.qcService.findVendorWithoutQCByRFQId(
            Number(rfq_id),
        );
    }

    @Post('create')
    create(@Body() createQcDto: CreateQcHeaderDTO, @Request() req) {
        return this.qcService.create(createQcDto, req.user);
    }

    @Patch('update/:qc_header_id')
    update(@Param('qc_header_id') qc_header_id: string, @Body() updateQcDto: UpdateQcHeaderDTO, @Request() req) {
        return this.qcService.update(Number(qc_header_id), updateQcDto, req.user);
    }

    @Get('qc-all')
    findAll(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.qcService.findAll(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

}
