import { Controller, Post, Body, Request, Get, Param, Patch, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
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
    findAll(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.PrService.findAll(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

    @Get('waiting-for-rfq')
    findWaitingForRFQ(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.PrService.findWaitingForRFQ(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

    @Get(':pr_id')
    findOne(@Param('pr_id', ParseIntPipe) pr_id: number) {
        return this.PrService.findOne(pr_id);
    }


    @Patch(':pr_id')
    update(@Param('pr_id') pr_id: number, @Body() dto: UpdatePRHeaderDTO, @Request() req: any) {
        return this.PrService.update(+pr_id, dto, req.context);
    }

    @Patch(':pr_id/pending')
    pending(@Param('pr_id') pr_id: number) {
        return this.PrService.pending(+pr_id);
    }

    @Patch(':pr_id/approve')
    approve(@Param('pr_id') pr_id: number) {
        return this.PrService.approve(+pr_id);
    }

    @Patch(':pr_id/reject')
    reject(@Param('pr_id') pr_id: number) {
        return this.PrService.reject(+pr_id);
    }

    @Patch(':pr_id/cancel')
    cancel(@Param('pr_id') pr_id: number) {
        return this.PrService.cancel(+pr_id);
    }

}
