import { Module } from '@nestjs/common';
import { PoApprovalController } from './po-approval.controller';
import { PoApprovalService } from './po-approval.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module'; 
import { CreatePOApprovalHeaderRepository } from './repository/create-po-approval.repository';
import { CreatePOApprovalLineRepository } from './repository/create-po-approval-line.repository';
import { PoApprovalCalculationDomainService } from './domain/po-approval-calculation.domain.service';
import { PoApprovalTaxService } from './domain/po-approval-tax.service';

@Module({
    imports: [
    // 2. ใส่ Module ใน imports ห้ามใส่ Service
    DocumentNumberModule, 
  ],
  controllers: [PoApprovalController],
  providers: [PoApprovalService,
    CreatePOApprovalHeaderRepository,
    CreatePOApprovalLineRepository,
    PoApprovalCalculationDomainService,
    PoApprovalTaxService,
  ],
})
export class PoApprovalModule {}
