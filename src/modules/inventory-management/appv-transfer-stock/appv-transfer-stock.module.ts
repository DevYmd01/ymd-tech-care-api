import { Module } from '@nestjs/common';
import { AppvTransferStockController } from './appv-transfer-stock.controller';
import { AppvTransferStockService } from './appv-transfer-stock.service';

import { PrismaService } from '@/prisma/prisma.service';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

import { CreateAppvTransferHeaderRepository } from './repository/create-appv-transfer-header.repository';
import { CreateAppvTransferLineRepository } from './repository/create-appv-transfer-line.repository';
import { CreateAppvTransferHeaderMapper } from './mapper/create-appv-transfer-header.mapper';
import { CreateAppvTransferLineMapper } from './mapper/create-appv-transfer-line.mapper';
import { UpdateAppvTransferHeaderRepository } from './repository/update-appv-transfer-header.repository';
import { UpdateAppvTransferLineRepository } from './repository/update-appv-transfer-line.repository';
import { UpdateAppvTransferHeaderMapper } from './mapper/update-appv-transfer-header.mapper';
import { UpdateAppvTransferLineMapper } from './mapper/update-appv-transfer-line.mapper';

@Module({
  controllers: [AppvTransferStockController],
  providers: [
    AppvTransferStockService,
    PrismaService,
    CreateAppvTransferHeaderRepository,
    CreateAppvTransferLineRepository,
    CreateAppvTransferHeaderMapper,
    CreateAppvTransferLineMapper,
    UpdateAppvTransferHeaderRepository,
    UpdateAppvTransferLineRepository,
    UpdateAppvTransferHeaderMapper,
    UpdateAppvTransferLineMapper
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class AppvTransferStockModule {}
