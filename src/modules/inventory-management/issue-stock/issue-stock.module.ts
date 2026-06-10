import { Module } from '@nestjs/common';
import { IssueStockController } from './issue-stock.controller';
import { IssueStockService } from './issue-stock.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateIssueStockHeaderRepository } from './repository/create-issue-stock-header.repository';
import { CreateIssueStockLineRepository } from './repository/create-issue-stock-line.repository';
import { CreateIssueStockHeaderMapper } from './mapper/create-issue-stock-header.mapper';
import { CreateIssueStockLineMapper } from './mapper/create-issue-stock-line.mapper';

import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module';
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

@Module({
  controllers: [IssueStockController],
  providers: [
    IssueStockService,
    CreateIssueStockHeaderRepository,
    CreateIssueStockLineRepository,
    PrismaService,
    CreateIssueStockHeaderMapper,
    CreateIssueStockLineMapper,
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class IssueStockModule {}
