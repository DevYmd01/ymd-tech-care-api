import { Module } from '@nestjs/common';
import { BillGroupController } from './bill-group.controller';
import { BillGroupService } from './bill-group.service';

@Module({
  controllers: [BillGroupController],
  providers: [BillGroupService]
})
export class BillGroupModule {}
