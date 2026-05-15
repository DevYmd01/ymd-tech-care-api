import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LotTransactionService } from './lot-transaction.service';
import { LotTransactionInterface } from './interfaces/lot-transaction.interface';

@Controller('lot-transaction')
export class LotTransactionController {
  constructor(
    private readonly lotTransactionService: LotTransactionService,
  ) {}

  // ======================================================
  // CREATE LOT TRANSACTION
  // ======================================================
  @Post()
  async create(
    @Body() dto: LotTransactionInterface
) {
    return this.lotTransactionService.create(dto);
  }


}