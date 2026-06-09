import { Controller, Post, Body, Get, Patch, Param, Request, Query, Res, ParseIntPipe } from '@nestjs/common';
import { IssueRequistionService } from './issue-requistion.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateIssueRequistionHeaderDto } from './dto/create-issue-requistion-header.dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('issue-requistion')
export class IssueRequistionController {
  constructor(private readonly issueRequistionService: IssueRequistionService) {}

  @Post()
  async create(@Body() createIssueRequistionDto: CreateIssueRequistionHeaderDto) {
    return this.issueRequistionService.create(createIssueRequistionDto);
  }

}
