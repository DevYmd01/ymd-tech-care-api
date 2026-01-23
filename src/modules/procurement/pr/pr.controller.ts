import { Controller, Post, Body } from '@nestjs/common';
import { PrService } from './pr.service';
import { CreatePRDTO } from './dto/ceacte-pr.dto'

@Controller('procurement/pr')
export class PrController {
    constructor(private readonly PrService: PrService) { }

    /// เพิ่มข้อมูล
    @Post()
    create(@Body() dto: CreatePRDTO) {
        return this.PrService.create(dto);
    }
}
