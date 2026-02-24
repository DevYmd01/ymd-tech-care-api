import { Controller, Get, Param, Res } from '@nestjs/common';
import express from 'express';
import { PdfService } from '@/modules/pdf/pdf.service';

@Controller('pdf')
export class PdfController {

    constructor(private readonly pdfService: PdfService) { }

    @Get(':id/pdf')
    async getPDF(
        @Param('id') id: number,
        @Res() res: express.Response
    ) {

        const pdfBuffer = await this.pdfService.generateRFQ({
            rfqNo: 'RFQ-001',
            vendorName: 'Test Vendor',
            items: []
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=rfq.pdf',
            'Content-Length': pdfBuffer.length,
        });

        res.end(pdfBuffer);
    }
}
