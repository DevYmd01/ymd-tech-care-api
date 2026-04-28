import { Module } from '@nestjs/common';
import { SaleOrderController } from './sale-order.controller';
import { SaleOrderService } from './sale-order.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { CreateSaleOrderHeaderRepository } from './repository/create-sale-order-header.repository';
import { CreateSaleOrderLineRepository } from './repository/create-sale-order-line.repository';
import { CreateSaleOrderHeaderMapper } from './mapper/create-sale-order-header.mapper';
import { CreateSaleOrderLineMapper } from './mapper/create-sale-order-line.mapper';



@Module({
  controllers: [SaleOrderController],
  providers: [
    SaleOrderService,
    TaxService,
    CalculationDomainService,
    CreateSaleOrderHeaderRepository,
    CreateSaleOrderLineRepository,
    CreateSaleOrderHeaderMapper,
    CreateSaleOrderLineMapper
  ],
  imports: [
    DocumentNumberModule
  ]
})
export class SaleOrderModule {}
