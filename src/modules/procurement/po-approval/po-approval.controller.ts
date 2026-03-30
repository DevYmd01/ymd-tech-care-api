import { Controller, Get, Body, Post, Param, Request, Patch, Query} from '@nestjs/common';
import { PoApprovalService } from './po-approval.service';
import { createPoApprovalDto } from './dto/create-po-approval.dto';
import { SearchPoApprovalDto } from './dto/search-po-approval.dto';

@Controller('po-approval')
export class PoApprovalController {
constructor(private readonly poApprovalService: PoApprovalService) {}

@Post()
create(@Body() createPoApprovalDto: createPoApprovalDto, @Request() req: any) {
  return this.poApprovalService.create(createPoApprovalDto, req.context);
}

  @Get()
  findAll(@Query() query: SearchPoApprovalDto) {
    return this.poApprovalService.findAll(query);
  }

  @Get('po/pending-approval')
  async poApprovalPending() {
    return this.poApprovalService.poApprovalPending();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      return this.poApprovalService.findOne(+id);
  }


}
