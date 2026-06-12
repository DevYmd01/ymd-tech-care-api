import { Module } from '@nestjs/common';
import { TransferStockService } from './transfer-stock.service';
import { TransferStockController } from './transfer-stock.controller';
import { PrismaService } from '@/prisma/prisma.service';

import { CreateTransferReqHeaderRepository } from './repository/create-transfer-req-header.repository';
import { CreateTransferReqLineRepository } from './repository/create-transfer-req-line.repository';
import { CreateTransferReqHeaderMapper } from './mapper/create-transfer-req-header.mapper';
import { CreateTransferReqLineMapper } from './mapper/create-transfer-req-line.mapper';
import { UpdateTransferReqHeaderRepository } from './repository/update-transfer-req-header.repository';
import { UpdateTransferReqLineRepository } from './repository/update-transfer-req-line.repository';
import { UpdateTransferReqHeaderMapper } from './mapper/update-transfer-req-header.mapper';

import { UpdateTransferReqLineMapper } from './mapper/update-transfer-req-line.mapper';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';


@Module({
  controllers: [TransferStockController],
  providers: [
    TransferStockService,
    PrismaService,
    CreateTransferReqHeaderRepository,
    CreateTransferReqLineRepository,
    CreateTransferReqHeaderMapper,
    CreateTransferReqLineMapper,
    UpdateTransferReqHeaderRepository,
    UpdateTransferReqLineRepository,
    UpdateTransferReqHeaderMapper,
    UpdateTransferReqLineMapper
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class TransferStockModule {}
