import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { IssueStockService } from './issue-stock.service';
import { CreateIssueStockHeaderDto } from './dto/create-issue-stock-header.dto';
import { UpdateIssueStockHeaderDto } from './dto/update-issue-stock-header.dto';

@Controller('issue-stock')
export class IssueStockController {
    
  constructor(private readonly issueStockService: IssueStockService) {}

  @Post()
  create(@Body() createIssueStockDto: CreateIssueStockHeaderDto) {
    return this.issueStockService.create(createIssueStockDto);
  }

  @Get()
  findAll() {
    return this.issueStockService.findAll();
  }

  @Get('pending-issue-stock')
  findPendingIssueStock() {
    return this.issueStockService.findPendingIssueStock();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueStockDto: UpdateIssueStockHeaderDto) {
    return this.issueStockService.update(+id, updateIssueStockDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issueStockService.findOne(+id);
  }

  @Get('pending-issue-stock/:id')
  findPendingIssueStockBySoId(@Param('id') id: string) {
    return this.issueStockService.findPendingIssueStockBySoId(+id);
  }



}
