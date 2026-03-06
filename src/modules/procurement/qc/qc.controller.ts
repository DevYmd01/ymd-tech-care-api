import { Controller, Get, Body, Post, Param, Request, Patch, Query } from '@nestjs/common';
import { QcService } from './qc.service';
// import { CreateQcDTO } from './dto/create-qc.dto';
// import { UpdateQcDTO } from './dto/update-qc.dto';

@Controller('qc')
export class QcController {

    constructor(private readonly qcService: QcService) { }

    @Get('pr/waiting-for-qc')
    findPRWithoutQC(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.qcService.findPRWithoutQC(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

    @Get('rfq/waiting-for-qc')
    findRFQWithoutQC(
        @Query('page') page: string,
        @Query('pageSize') pageSize: string,
    ) {
        return this.qcService.findRFQWithoutQC(
            Number(page) || 1,
            Number(pageSize) || 20,
        );
    }

}
