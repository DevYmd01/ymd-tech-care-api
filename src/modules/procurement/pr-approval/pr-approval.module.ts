import { Module } from '@nestjs/common';
import { PrApprovalService } from './pr-approval.service';
import { PrApprovalController } from './pr-approval.controller';
import { PrApprovalTaxService } from './domain/pr-approval-tax.service';
import { PrApprovalCalculationDomainService } from './domain/pr-approval-calculation.domain.service';
import { CreatePRApprovalHeaderRepository } from './repository/create-pr-approval.repository';
import { CreatePRApprovalLineRepository } from './repository/create-pr-approval-line.repository';

// 1. นำเข้า DocumentNumberModule
import { DocumentNumberModule } from '@/modules/document-number/document-number.module'; 

@Module({
  imports: [
    // 2. ใส่ Module ใน imports ห้ามใส่ Service
    DocumentNumberModule, 
  ],
  controllers: [PrApprovalController],
  providers: [
    PrApprovalService,
    PrApprovalTaxService,
    PrApprovalCalculationDomainService,
    CreatePRApprovalHeaderRepository,
    CreatePRApprovalLineRepository
    // หมายเหตุ: DocumentNumberService ไม่ต้องใส่ตรงนี้ เพราะเราดึงมาจาก DocumentNumberModule แล้ว
  ],
})
export class PrApprovalModule {}
