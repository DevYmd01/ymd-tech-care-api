import { Module } from '@nestjs/common';
import { IssueRequistionController } from './issue-requistion.controller';
import { IssueRequistionService } from './issue-requistion.service';

@Module({
  controllers: [IssueRequistionController],
  providers: [IssueRequistionService]
})
export class IssueRequistionModule {}
