import { Module } from '@nestjs/common';
import { AppvTransferStockController } from './appv-transfer-stock.controller';
import { AppvTransferStockService } from './appv-transfer-stock.service';

@Module({
  controllers: [AppvTransferStockController],
  providers: [AppvTransferStockService]
})
export class AppvTransferStockModule {}
