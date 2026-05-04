import { Module } from '@nestjs/common';
import { SaleOrderApprovalController } from './sale-order-approval.controller';
import { SaleOrderApprovalService } from './sale-order-approval.service';

@Module({
  controllers: [SaleOrderApprovalController],
  providers: [SaleOrderApprovalService]
})
export class SaleOrderApprovalModule {}
