import { Controller, Post, Body, Get, Patch, Param, Request, Query, Res, ParseIntPipe} from '@nestjs/common';
import { CreateApprovedIssueRequisitionHeaderDto } from './dto/create-appv-issue-req-header.dto';
import { AppvIssueRequistionService } from './appv-issue-requistion.service';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('appv-issue-requistion')
export class AppvIssueRequistionController {
    constructor(private readonly appvIssueRequistionService: AppvIssueRequistionService) {}

    @Post()
    async create(@Body() createApprovedIssueRequisitionHeaderDto: CreateApprovedIssueRequisitionHeaderDto) {
        return this.appvIssueRequistionService.create(createApprovedIssueRequisitionHeaderDto);
    }
    @Get()
    async findAll() {
        return this.appvIssueRequistionService.findAll();
    }

    @Get('pending-approva')
    async findPendingApproval() {
        return this.appvIssueRequistionService.findPendingApproval();
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.appvIssueRequistionService.findOne(+id);
    }


    @Get('pending-approva/:issue_req_id')
    async findPendingApprovalByIssueReqId(@Param('issue_req_id') issue_req_id: string) {
        return this.appvIssueRequistionService.findPendingApprovalByIssueReqId(+issue_req_id);
    }
}
