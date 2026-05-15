import { Module } from '@nestjs/common';
import { LotTransactionController } from './lot-transaction.controller';
import { LotTransactionService } from './lot-transaction.service';
import { LotTransactionRepository } from './repository/lot-transaction.repository';

@Module({
  controllers: [LotTransactionController],
  providers: [
    LotTransactionService,
    LotTransactionRepository,
  ],
  exports: [LotTransactionService],
})
export class LotTransactionModule {}