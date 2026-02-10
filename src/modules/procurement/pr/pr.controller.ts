import { Controller, Post, Body, Request, Get } from '@nestjs/common';
import { PrService } from './pr.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'

@Controller('procurement/pr')
export class PrController {
    constructor(private readonly PrService: PrService) { }

    /// เพิ่มข้อมูล
    @Post()
    create(@Body() dto: CreatePRHeaderDTO, @Request() req: any) {
        return this.PrService.create(dto, req.context);
    }

    @Get()
    findAll() {
        return this.PrService.findAll();
    }
}
