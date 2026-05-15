import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';

import { StockTransactionService } from './stock-transaction.service';

@Controller('stock-transaction')
export class StockTransactionController {
  constructor(
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  // ======================================================
  // CREATE STOCK TRANSACTION
  // ======================================================
  @Post()
  async create(
    @Body() dto: CreateStockTransactionDto,
  ) {
    return this.stockTransactionService.create(dto);
  }

// ====
// GET ALL 
// ====
  @Get()
  async findAll() {
    return this.stockTransactionService.findAll();
  }

  // ======================================================
  // GET TRANSACTION BY ID
  // ======================================================
  @Get(':stock_transaction_id')
  async findOne(
    @Param('stock_transaction_id')
    stock_transaction_id: string,
  ) {
    return this.stockTransactionService.findOne(
      +stock_transaction_id,
    );
  }

  // ======================================================
  // GET ALL TRANSACTIONS BY ITEM
  // ======================================================
  @Get('/item/:item_id')
  async findManyByItem(
    @Param('item_id')
    item_id: string,
  ) {
    return this.stockTransactionService.findManyByItem(
      +item_id,
    );
  }

  // ======================================================
  // GET TRANSACTION BY DOCUMENT
  // ======================================================
  @Get('/document/:ref_doc_type/:ref_doc_no')
  async findByRefDoc(
    @Param('ref_doc_type')
    ref_doc_type: string,

    @Param('ref_doc_no')
    ref_doc_no: string,
  ) {
    return this.stockTransactionService.findByRefDoc(
      ref_doc_type,
      ref_doc_no,
    );
  }
}