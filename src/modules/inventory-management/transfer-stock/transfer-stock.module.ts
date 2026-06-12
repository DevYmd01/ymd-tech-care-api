import { Module } from '@nestjs/common';
import { TransferStockService } from './transfer-stock.service';
import { TransferStockController } from './transfer-stock.controller';

@Module({
  providers: [TransferStockService],
  controllers: [TransferStockController]
})
export class TransferStockModule {}
