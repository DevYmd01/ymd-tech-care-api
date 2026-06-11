import { Module } from '@nestjs/common';
import { ReturnStockController } from './return-stock.controller';
import { ReturnStockService } from './return-stock.service';
import { PrismaService } from '@/prisma/prisma.service';

import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

import { CreateReturnStockHeaderRepository } from './repository/create-return-stock-header.repository';
import { CreateReturnStockLineRepository } from './repository/create-return-stock-line.repository';
import { CreateReturnStockHeaderMapper } from './mapper/create-return-stock-header.mapper';
import { CreateReturnStockLineMapper } from './mapper/create-return-stock-line.mapper';

@Module({
  controllers: [ReturnStockController],
  providers: [
    ReturnStockService,
    PrismaService,
    CreateReturnStockHeaderRepository,
    CreateReturnStockLineRepository,
    CreateReturnStockHeaderMapper,
    CreateReturnStockLineMapper
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class ReturnStockModule {}
