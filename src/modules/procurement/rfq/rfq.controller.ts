import { Controller, Post, Body, Get, Patch, Param, Request, Query, Res, ParseIntPipe } from '@nestjs/common';
import { RfqService } from './rfq.service';
import express from 'express'; // ⭐ เพิ่มบรรทัดนี้
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';
import { UpdateRFQHeaderDTO } from './dto/update-rfq-header.dto';
import { SendMailRFQDTO } from './dto/send-to-vendor.dto';

@Controller('rfq')
export class RfqController {
    constructor(private readonly rfqService: RfqService) { }

    @Post()
    async createRFQ(@Body() rfqHeader: CreateRFQHeaderDTO, @Request() req: any) {
        return this.rfqService.createRFQ(rfqHeader, req.context);
    }

    @Get()
    async findAll(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.rfqService.findAll(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

    @Get(':rfq_id')
    async findOne(@Param('rfq_id') rfq_id: number) {
        return this.rfqService.findOne(rfq_id);
    }

    @Patch(':rfq_id')
    async updateRFQ(@Body() rfqHeader: UpdateRFQHeaderDTO, @Param('rfq_id') rfq_id: number, @Request() req: any) {
        return this.rfqService.updateRFQ(rfqHeader, rfq_id, req.context);
    }

    @Get('vendors/:rfq_id')
    async findVendors(@Param('rfq_id') rfq_id: number) {
        return this.rfqService.findVendors(rfq_id);
    }

    @Patch(':rfq_vendor_id/send-to-vendor')
    async sendToVendor(
        @Body() dto: SendMailRFQDTO,
        @Param('rfq_vendor_id', ParseIntPipe) rfq_vendor_id: number,
        @Request() req: any
    ) {
        return this.rfqService.sendToVendor(
            rfq_vendor_id,
            dto,
            req.context
        );
    }


    @Get('vendor/:id/pdf')
    async getVendorPDF(
        @Param('id') id: number,
        @Res() res: express.Response
    ) {

        const pdfBuffer = await this.rfqService.getRFQVendorPDF(+id);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=rfq.pdf');

        return res.send(pdfBuffer);
    }

    @Get('pr/without-rfq')
    async findPRWithoutRFQ(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.rfqService.findPRWithoutRFQ(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }


}
