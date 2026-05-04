import { Module } from '@nestjs/common';
import { SaleOrderApprovalController } from './sale-order-approval.controller';
import { SaleOrderApprovalService } from './sale-order-approval.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { CreateSaleOrderApprovalHeaderRepository } from './repository/create-sale-order-ap-header.repository';
import { CreateSaleOrderApprovalLineRepository } from './repository/create-sale-order-ap-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSaleOrderApprovalHeaderMapper } from './mapper/create-sale-order-ap-header.mapper';
import { CreateSaleOrderApprovalLineMapper } from './mapper/create-sale-order-ap-line.mapper';

@Module({
  controllers: [SaleOrderApprovalController],
  providers: [
    SaleOrderApprovalService,
    TaxService,
    CalculationDomainService,
    PrismaService,
    CreateSaleOrderApprovalHeaderRepository,
    CreateSaleOrderApprovalLineRepository,
    CreateSaleOrderApprovalHeaderMapper,
    CreateSaleOrderApprovalLineMapper,
  ],
  imports: [DocumentNumberModule],
  exports: [SaleOrderApprovalService],
})
export class SaleOrderApprovalModule {}
