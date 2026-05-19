// src/common/inventory/lot-balance/lot-balance.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LotBalanceService } from './lot-balance.service';
import { CreateLotBalanceDto } from './dto/create-lot-balance.dto';

import { ReceiveLotService } from './domain/service/movements/receive-lot.service';
import { ReserveLotService } from './domain/service/movements/reserve-lot.service';
import { ReleaseLotService } from './domain/service/movements/release-lot.service';
import { IssueLotService } from './domain/service/movements/issue-lot.service';
import { TransferLotService } from './domain/service/movements/transfer-lot.service';
import { AdjustLotService } from './domain/service/movements/adjust-lot.service';
import { LotTransactionType } from './enums/lot-balance-type.enum';

@Controller('lot-balance')
export class LotBalanceController {
  constructor(
    private readonly service: LotBalanceService,
    private readonly receiveLotService: ReceiveLotService,
    private readonly reserveLotService: ReserveLotService,
    private readonly issueLotService: IssueLotService,
  ) {}
  @Post('test')
  async test() {
    await this.reserveLotService.execute({
      item_id: 1,
      warehouse_id: 1,
      location_id: 2,
      branch_id: 1,
      lot_id: 1,
      qty: 200,
      // trans_type: LotTransactionType.RECEIVE,
      ref_doc_no: 'RCV-001',
      remark: 'Test receive stock',
    });    
   }
}