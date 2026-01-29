import { Controller, Post, Body } from '@nestjs/common';
import { PrService } from './pr.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'

@Controller('procurement/pr')
export class PrController {
    constructor(private readonly PrService: PrService) { }

    /// เพิ่มข้อมูล
    @Post()
    create(@Body() dto: CreatePRHeaderDTO) {
        return this.PrService.create(dto);
    }
}
