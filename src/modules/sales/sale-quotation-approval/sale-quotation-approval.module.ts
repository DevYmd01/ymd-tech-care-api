import { Module } from '@nestjs/common';
import { SaleQuotationApprovalController } from './sale-quotation-approval.controller';
import { SaleQuotationApprovalService } from './sale-quotation-approval.service';

@Module({
  controllers: [SaleQuotationApprovalController],
  providers: [SaleQuotationApprovalService]
})
export class SaleQuotationApprovalModule {}
