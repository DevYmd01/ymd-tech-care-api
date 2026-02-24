import { Controller, Post, Body, Get, Patch, Param, Request } from '@nestjs/common';
import { RfqService } from './rfq.service';
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';
import { UpdateRFQHeaderDTO } from './dto/update-rfq-header.dto';

@Controller('rfq')
export class RfqController {
    constructor(private readonly rfqService: RfqService) { }

    @Post()
    async createRFQ(@Body() rfqHeader: CreateRFQHeaderDTO, @Request() req: any) {
        return this.rfqService.createRFQ(rfqHeader, req.context);
    }

    @Get()
    async findAll() {
        return this.rfqService.findAll();
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
}
