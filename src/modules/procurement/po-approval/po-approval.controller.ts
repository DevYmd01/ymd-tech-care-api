import { Controller, Get, Body, Post, Param, Request, Patch, Query} from '@nestjs/common';
import { PoApprovalService } from './po-approval.service';
import { createPoApprovalDto } from './dto/create-po-approval.dto';
import { createPoApprovalLineDto } from './dto/create-po-line-approval.to';

@Controller('po-approval')
export class PoApprovalController {
constructor(private readonly poApprovalService: PoApprovalService) {}

@Post()
create(@Body() createPoApprovalDto: createPoApprovalDto) {
  return this.poApprovalService.create(createPoApprovalDto);
}


}
