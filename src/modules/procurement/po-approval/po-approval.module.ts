import { Module } from '@nestjs/common';
import { PoApprovalController } from './po-approval.controller';
import { PoApprovalService } from './po-approval.service';

@Module({
  controllers: [PoApprovalController],
  providers: [PoApprovalService]
})
export class PoApprovalModule {}
