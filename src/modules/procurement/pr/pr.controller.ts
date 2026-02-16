import { Controller, Post, Body, Request, Get, Param, Patch } from '@nestjs/common';
import { PrService } from './pr.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'
import { UpdatePRHeaderDTO } from './dto/update-pr-header.dto';

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

    @Get(':pr_id')
    findOne(@Param('pr_id') pr_id: string) {
        return this.PrService.findOne(+pr_id);
    }

    @Patch(':pr_id')
    update(@Param('pr_id') pr_id: string, @Body() dto: UpdatePRHeaderDTO, @Request() req: any) {
        return this.PrService.update(+pr_id, dto, req.context);
    }
}
