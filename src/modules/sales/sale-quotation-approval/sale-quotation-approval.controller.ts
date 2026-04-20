import { Controller, Get, Body, Post, Request, Query, Param } from '@nestjs/common';
import { SaleQuotationApprovalService } from './sale-quotation-approval.service';
import { CreateHeaderDto } from './dto/create-header.dto';  

@Controller('sale-quotation-approval')
export class SaleQuotationApprovalController {
    
  constructor(private readonly saleQuotationApprovalService: SaleQuotationApprovalService) {}

  @Post()
  create(@Body() createSaleQuotationHeaderDto: CreateHeaderDto, @Request() req: any) {
    return this.saleQuotationApprovalService.create(createSaleQuotationHeaderDto, req.user);
  }



  // แสดงข้อมูล sale-quotation ที่รออนุมัติ
@Get('pending-approval')
async sqApprovalPending() {
    return this.saleQuotationApprovalService.sqApprovalPending();
}

// แสดงข้อมูล sale-quotation ที่รออนุมัติ เรียกใช้งาน ID
@Get('pending-approval/:id')
async findPendingApproval(@Param('id') id: string) {
    return this.saleQuotationApprovalService.findPendingApproval(+id);
}



}
