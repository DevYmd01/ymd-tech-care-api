import { Module } from '@nestjs/common';
import { StockBalanceController } from './stock-balance.controller';
import { StockBalanceService } from './stock-balance.service';

@Module({
  controllers: [StockBalanceController],
  providers: [StockBalanceService]
})
export class StockBalanceModule {}
