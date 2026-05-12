import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';

import { StockTransactionController } from './stock-transaction.controller';

import { StockTransactionService } from './stock-transaction.service';

import { StockTransactionRepository } from './repository/stock-transaction.repository';

@Module({
  imports: [PrismaModule],

  controllers: [StockTransactionController],

  providers: [
    StockTransactionService,
    StockTransactionRepository,
  ],

  exports: [
    StockTransactionService,
  ],
})
export class StockTransactionModule {}