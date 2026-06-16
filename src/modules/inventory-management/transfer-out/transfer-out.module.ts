import { Module } from '@nestjs/common';
import { TransferOutController } from './transfer-out.controller';
import { TransferOutService } from './transfer-out.service';

import { PrismaService } from '@/prisma/prisma.service';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

import { CreateTransferOutHeaderRepository } from './repository/create-transfer-out-herder.repository';
import { CreateTransferOutLineRepository } from './repository/create-transfer-out-line.repository';
import { CreateTransferOutHeaderMapper } from './mapper/create-transfer-out-herder.mapper';
import { CreateTransferOutLineMapper } from './mapper/create-transfer-out-line.mapper';


@Module({
  controllers: [TransferOutController],
  providers: [
    TransferOutService,
    PrismaService,
    CreateTransferOutHeaderRepository,
    CreateTransferOutLineRepository,
    CreateTransferOutHeaderMapper,
    CreateTransferOutLineMapper,
  ],
  imports: [
    LotBalanceModule,
    StockOptionsModule,
    DocumentNumberModule,
  ],
  exports: [
    TransferOutService,
  ],
})
export class TransferOutModule {}
