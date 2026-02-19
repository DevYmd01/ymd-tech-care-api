import { Controller, Post, Body } from '@nestjs/common';
import { RfqService } from './rfq.service';
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';

@Controller('rfq')
export class RfqController {
    constructor(private readonly rfqService: RfqService) { }

    @Post()
    async createRFQ(@Body() rfqHeader: CreateRFQHeaderDTO) {
        return this.rfqService.createRFQ(rfqHeader);
    }
}
