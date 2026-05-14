import { Module } from '@nestjs/common';
import { LotTransactionController } from './lot-transaction.controller';
import { LotTransactionService } from './lot-transaction.service';

@Module({
  controllers: [LotTransactionController],
  providers: [LotTransactionService]
})
export class LotTransactionModule {}
