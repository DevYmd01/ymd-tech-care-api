import { Module } from '@nestjs/common';
import { PrApprovalController } from './pr-approval.controller';
import { PrApprovalService } from './pr-approval.service';

@Module({
  controllers: [PrApprovalController],
  providers: [PrApprovalService]
})
export class PrApprovalModule {}
