import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { RfqService } from './rfq.service';
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';
import { UpdateRFQHeaderDTO } from './dto/update-rfq-header.dto';

@Controller('rfq')
export class RfqController {
    constructor(private readonly rfqService: RfqService) { }

    @Post()
    async createRFQ(@Body() rfqHeader: CreateRFQHeaderDTO) {
        return this.rfqService.createRFQ(rfqHeader);
    }

    @Get()
    async findAll() {
        return this.rfqService.findAll();
    }

    @Patch(':rfq_id')
    async updateRFQ(@Body() rfqHeader: UpdateRFQHeaderDTO, @Param('rfq_id') rfq_id: number) {
        return this.rfqService.updateRFQ(rfqHeader, rfq_id);
    }
}
