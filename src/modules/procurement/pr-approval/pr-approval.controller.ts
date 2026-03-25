import { Controller, Get, Body, Post, Request, Query, Param } from '@nestjs/common';
import { PrApprovalService } from './pr-approval.service';
import { createPrApprovalDto } from './dto/creacte-pr-approval.dto';
import { SearchPRAppointmentDto} from './dto/search-approval.dto';

@Controller('pr-approval')
export class PrApprovalController {

    constructor(private readonly PrApprovalService: PrApprovalService) {}

    @Post()
    async create(@Body() createPrApprovalDto: createPrApprovalDto, @Request() req: any) {
        return this.PrApprovalService.create(createPrApprovalDto, req.user);
        }

    @Get()
    async findAll( 
        @Query() query: SearchPRAppointmentDto,
     ) {
        return this.PrApprovalService.findAll(query);
    }

    // ข้อมูล pr รออนุัติ
    @Get('pr/pending-approval')
    async prApprovalPending() {
        return this.PrApprovalService.prApprovalPending();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.PrApprovalService.findOne(+id);
    }

    // แสดง pr ที่ต้องการอนุมัติและยังเหลืออยู่ที่ยังไม่ได้อนุมัติ
    @Get(':id/pr')
    async findPR(@Param('id') id: string) {
        return this.PrApprovalService.findPR(+id);
    }

}
