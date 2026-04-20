import { Module } from '@nestjs/common';
import { SaleQuotationApprovalController } from './sale-quotation-approval.controller';
import { SaleQuotationApprovalService } from './sale-quotation-approval.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { TaxService } from './domain/tax.domain.service';
import { CalculationDomainService } from './domain/calculation.domain.service';
import { PricingEngineModule } from '@/modules/pricing/pricing-engine/pricing-engine.module';
import { PricingEngineService } from '@/modules/pricing/pricing-engine/pricing-engine.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHeaderMapper } from './mapper/create-header.mapper';
import { CreateHeaderRepository } from './repository/create-header.repository';
import { CreateLineMapper } from './mapper/create-line.mapper';
import { CreateLineRepository } from './repository/create-line.repository';



@Module({
  imports: [DocumentNumberModule, PricingEngineModule],
  controllers: [SaleQuotationApprovalController],
  providers: [
    SaleQuotationApprovalService,
    TaxService,
    CalculationDomainService,
    PricingEngineService,
    PrismaService,
    CreateHeaderMapper,
    CreateHeaderRepository,
    CreateLineMapper,
    CreateLineRepository
  ]
})
export class SaleQuotationApprovalModule {}
