import { Module } from '@nestjs/common';
import { TransferInController } from './transfer-in.controller';
import { TransferInService } from './transfer-in.service';

import { PrismaService } from '@/prisma/prisma.service';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

import { CreateTransferInHeaderMapper } from './mapper/create-transfer-in-herder.mapper';
import { CreateTransferInLineMapper } from './mapper/create-transfer-in-line.mapper';
import { CreateTransferInHeaderRepository } from './repository/create-transfer-in-herder.repository';
import {CreateTransferInLineRepository } from './repository/create-transfer-in-line.repository';




@Module({
  controllers: [TransferInController],
  providers: [
    TransferInService,
    PrismaService,
    CreateTransferInHeaderMapper,
    CreateTransferInLineMapper,
    CreateTransferInHeaderRepository,
    CreateTransferInLineRepository
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class TransferInModule {}
