import { Module } from '@nestjs/common';
import { AppvIssueRequistionController } from './appv-issue-requistion.controller';
import { AppvIssueRequistionService } from './appv-issue-requistion.service';
import { CreateAppvIssueReqHeaderRepository } from './repository/create-appv-issue-req-header.repository';
import { CreateAppvIssueReqLineRepository } from './repository/create-appv-issue-req-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAppvIssueReqHeaderMapper } from './mapper/create-appv-issue-req-header.mapper';
import { CreateAppvIssueReqLineMapper } from './mapper/create-appv-issue-req-line.mapper';
// import { UpdateAppvIssueReqHeaderRepository } from './repository/update-appv-issue-req-header.repository';
// import { UpdateAppvIssueReqLineRepository } from './repository/update-appv-issue-req-line.repository';
// import { UpdateAppvIssueReqHeaderMapper } from './mapper/update-appv-issue-req-header.mapper';
// import { UpdateAppvIssueReqLineMapper } from './mapper/update-appv-issue-req-line.mapper';
import { LotBalanceModule } from '@/common/inventory/lot-balance/lot-balance.module'
import { StockOptionsModule } from '@/common/inventory/stock-options/stock-options.module';

import { DocumentNumberModule } from '@/modules/document-number/document-number.module';

@Module({
  controllers: [AppvIssueRequistionController],
  providers: [
    AppvIssueRequistionService,
    CreateAppvIssueReqHeaderRepository,
    CreateAppvIssueReqLineRepository,
    PrismaService,
    // UpdateAppvIssueReqHeaderRepository,
    // UpdateAppvIssueReqLineRepository,
    // UpdateAppvIssueReqHeaderMapper,
    // UpdateAppvIssueReqLineMapper,
  ],
  imports: [LotBalanceModule, StockOptionsModule, DocumentNumberModule]
})
export class AppvIssueRequistionModule {}
