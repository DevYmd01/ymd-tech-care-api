import { Module } from '@nestjs/common';
import { IssueRequistionController } from './issue-requistion.controller';
import { IssueRequistionService } from './issue-requistion.service';
import { CreateIssueRequistionLineRepository } from './repository/create-issue-requistion-line.repository';
import { CreateIssueRequistionHeaderRepository } from './repository/create-issue-requistion-header.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateIssueRequistionHeaderMapper } from './mapper/create-issue-requistion-header.mapper';
import { CreateIssueRequistionLineMapper } from './mapper/create-issue-requistion-line.mapper';
import { UpdateIssueRequistionHeaderRepository } from './repository/update-issue-requistion-header.repository';
import { UpdateIssueRequistionLineRepository } from './repository/update-issue-requistion-line.repository';
import { UpdateIssueRequistionHeaderMapper } from './mapper/update-issue-requistion-header.mapper';
import { UpdateIssueRequistionLineMapper } from './mapper/update-issue-requistion-line.mapper';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module'
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';

import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

  

@Module({
  controllers: [IssueRequistionController],
  providers: [
    IssueRequistionService,
    CreateIssueRequistionHeaderRepository,
    CreateIssueRequistionLineRepository,
    PrismaService,
    CreateIssueRequistionHeaderMapper,
    CreateIssueRequistionLineMapper,
    UpdateIssueRequistionHeaderRepository,
    UpdateIssueRequistionLineRepository,
    UpdateIssueRequistionHeaderMapper,
    UpdateIssueRequistionLineMapper,
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class IssueRequistionModule {}
