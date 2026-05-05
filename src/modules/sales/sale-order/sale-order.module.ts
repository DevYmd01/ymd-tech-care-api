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
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateSaleOrderHeaderRepository } from './repository/update-sale-order-header.repository';
import { UpdateSaleOrderLineRepository } from './repository/update-sale-order-line.repository';
import { UpdateSaleOrderHeaderMapper } from './mapper/update-sale-order-header.mapper';
import { UpdateSaleOrderLineMapper } from './mapper/update-sale-order-line.mapper';
import { PrismaModule } from '@/prisma/prisma.module';


@Module({
  controllers: [SaleOrderController],
  providers: [
    SaleOrderService,
    TaxService,
    CalculationDomainService,
    CreateSaleOrderHeaderRepository,
    CreateSaleOrderLineRepository,
    CreateSaleOrderHeaderMapper,
    CreateSaleOrderLineMapper,
    PrismaService,
    UpdateSaleOrderHeaderRepository,
    UpdateSaleOrderLineRepository,
    UpdateSaleOrderHeaderMapper,
    UpdateSaleOrderLineMapper,
  ],
  
  imports: [
    DocumentNumberModule,PrismaModule
  ]
})
export class SaleOrderModule {}
