import { Module } from '@nestjs/common';
import { SaleQuotationController } from './sale-quotation.controller';
import { SaleQuotationService } from './sale-quotation.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { TaxService } from './domain/tax.domain.service';
import { CalculationDomainService } from './domain/calculation.domain.service';
import { PricingEngineModule } from '@/modules/pricing/pricing-engine/pricing-engine.module';
import { PricingEngineService } from '@/modules/pricing/pricing-engine/pricing-engine.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleQuotationHeaderMapper } from './mapper/create-sale-quotation-header.mapper';
import { CreateSaleQuotationHeaderRepository } from './repository/create-sale-quotation-header.repository';
import { CreateSaleQuotationLineMapper } from './mapper/create-sale-quotation-line.mapper';
import { CreateSaleQuotationLineRepository } from './repository/create-sale-quotation-line.repository';
import { UpdateSaleQuotationHeaderMapper } from './mapper/update-sale-quotation-header.mapper';
import { UpdateSaleQuotationHeaderRepository } from './repository/update-sale-quotation-header.repository';
import { UpdateSaleQuotationLineMapper } from './mapper/update-sale-quotation-line.mapper';
import { UpdateSaleQuotationLineRepository } from './repository/update-sale-quotation-line.repository';



@Module({
  imports: [DocumentNumberModule, PricingEngineModule],
  controllers: [SaleQuotationController],
  providers: [
    SaleQuotationService,
    TaxService,
    CalculationDomainService,
    PricingEngineService,
    PrismaService,
    CreateSaleQuotationHeaderMapper,
    CreateSaleQuotationHeaderRepository,
    CreateSaleQuotationLineMapper,
    CreateSaleQuotationLineRepository,
    UpdateSaleQuotationHeaderMapper,
    UpdateSaleQuotationHeaderRepository,
    UpdateSaleQuotationLineMapper,
    UpdateSaleQuotationLineRepository
  ]
})
export class SaleQuotationModule {}
