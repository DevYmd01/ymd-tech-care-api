import { Controller, Post } from '@nestjs/common';
import { StockBalanceService } from './stock-balance.service';
import { ReceiveStockService } from './domain/service/movements/receive-stock.service';
import { ReserveStockService } from './domain/service/movements/reserve-stock.service';
import { ReleaseStockService } from './domain/service/movements/release-stock.service';
import { IssueStockService } from './domain/service/movements/issue-stock.service';
import { TransferStockService } from './domain/service/movements/transfer-stock.service';
import { AdjustStockService } from './domain/service/movements/adjust-stock.service';

@Controller('stock-balance')
export class StockBalanceController {
    constructor(
    private readonly stockBalanceService: StockBalanceService,
    private readonly receiveStockService: ReceiveStockService,
    private readonly reserveStockService: ReserveStockService,
    private readonly releaseStockService: ReleaseStockService,
    private readonly issueStockService: IssueStockService,
    private readonly transferStockService: TransferStockService,
    private readonly adjustStockService: AdjustStockService,
  ) {}

@Post('test')
async test() {
  await this.receiveStockService.execute({
    item_id: 1,
    warehouse_id: 1,
    location_id: 1,
    branch_id: 1,
    qty: 100,
  });    
 }


}
