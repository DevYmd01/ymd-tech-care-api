import { Module } from '@nestjs/common';
import { StockBalanceController } from './stock-balance.controller';
import { StockBalanceService } from './stock-balance.service';

// domain services
import { ReceiveStockService } from './domain/service/movements/receive-stock.service';
import { ReserveStockService } from './domain/service/movements/reserve-stock.service';
import { ReleaseStockService } from './domain/service/movements/release-stock.service';
import { IssueStockService } from './domain/service/movements/issue-stock.service';
import { TransferStockService } from './domain/service/movements/transfer-stock.service';
import { AdjustStockService } from './domain/service/movements/adjust-stock.service';

@Module({
  controllers: [StockBalanceController],
  providers: [
    StockBalanceService,

    ReceiveStockService,
    ReserveStockService,
    ReleaseStockService,
    IssueStockService,
    TransferStockService,
    AdjustStockService,
  ],
  exports: [
    StockBalanceService,

    ReceiveStockService,
    ReserveStockService,
    ReleaseStockService,
    IssueStockService,
    TransferStockService,
    AdjustStockService,
  ],
})
export class StockBalanceModule {}