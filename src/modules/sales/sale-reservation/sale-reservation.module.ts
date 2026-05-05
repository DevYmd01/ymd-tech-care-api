import { Module } from '@nestjs/common';
import { SaleReservationController } from './sale-reservation.controller';
import { SaleReservationService } from './sale-reservation.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { CreateSaleReservationHeaderRepository } from './repository/create-sale-reservation-header.repository';
import { CreateSaleReservationLineRepository } from './repository/create-sale-reservation-line.repository';
import { CreateSaleReservationHeaderMapper } from './mapper/create-sale-reservation-header.mapper';
import { CreateSaleReservationLineMapper } from './mapper/create-sale-reservation-line.mapper';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { UpdateSaleReservationHeaderRepository } from './repository/update-sale-reservation-header.repository';
import { UpdateSaleReservationLineRepository } from './repository/update-sale-reservation-line.repository'; // Keep this, it's a repository

@Module({
  controllers: [SaleReservationController],
  providers: [
    SaleReservationService,
    PrismaService,
    TaxService,
    CalculationDomainService,
    CreateSaleReservationHeaderRepository,
    CreateSaleReservationLineRepository,
    CreateSaleReservationHeaderMapper,
    CreateSaleReservationLineMapper,
    UpdateSaleReservationHeaderRepository,
    UpdateSaleReservationLineRepository, // Keep this, it's a repository
  ],
  imports: [DocumentNumberModule, StockOptionsModule]
})
export class SaleReservationModule {}
