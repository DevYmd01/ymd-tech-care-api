import { Module } from '@nestjs/common';
import { GrnController } from './grn.controller';
import { GrnService } from './grn.service';

import { PrismaService } from '@/prisma/prisma.service';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

import { CreateGrnHeaderMapper } from './mapper/create-grn-header.mapper';
import { CreateGrnLineMapper } from './mapper/create-grn-line.mapper';
import { CreateGrnHeaderRepository } from './repository/create-grn-header.repository';
import { CreateGrnLineRepository } from './repository/create-grn-line.repository';



@Module({
  controllers: [GrnController],
  providers: [
    GrnService,
    PrismaService,
    CreateGrnHeaderMapper,
    CreateGrnLineMapper,
    CreateGrnHeaderRepository,
    CreateGrnLineRepository,
  ],
  imports: [
    LotBalanceModule,
    StockOptionsModule,
    DocumentNumberModule,
  ]
})
export class GrnModule {}
