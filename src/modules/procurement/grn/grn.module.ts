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

import { UpdateGrnHeaderMapper } from './mapper/update-grn-header.mapper';
import { UpdateGrnLineMapper } from './mapper/update-grn-line.mapper';
import { UpdateGrnHeaderRepository } from './repository/update-grn-header.repository';
import { UpdateGrnLineRepository } from './repository/update-grn-line.repository';

@Module({
  controllers: [GrnController],
  providers: [
    GrnService,
    PrismaService,
    CreateGrnHeaderMapper,
    CreateGrnLineMapper,
    CreateGrnHeaderRepository,
    CreateGrnLineRepository,
    UpdateGrnHeaderMapper,
    UpdateGrnLineMapper,
    UpdateGrnHeaderRepository,
    UpdateGrnLineRepository
  ],
  imports: [
    LotBalanceModule,
    StockOptionsModule,
    DocumentNumberModule,
  ]
})
export class GrnModule {}
