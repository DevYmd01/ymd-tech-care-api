import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';

import { StockTransactionMapper } from './mapper/stock-transaction.mapper';

import { StockTransactionRepository } from './repository/stock-transaction.repository';

@Injectable()
export class StockTransactionService {
  constructor(
    private readonly stockTransactionRepository: StockTransactionRepository,
  ) {}

  // ======================================================
  // CREATE STOCK TRANSACTION
  // ======================================================
  // ใช้สำหรับสร้าง movement ของ stock
  //
  // ตัวอย่าง:
  // - RECEIVE
  // - ISSUE
  // - RESERVE
  // - RELEASE
  // - TRANSFER
  // - ADJUST
  //
  // หมายเหตุ:
  // service นี้มีหน้าที่จัดการ transaction record เท่านั้น
  // business logic หลักควรอยู่ใน StockPostingService
  // ======================================================
  async create(
    dto: CreateStockTransactionDto,
    tx?: Prisma.TransactionClient,
  ) {
    // แปลง DTO → Prisma Input
    const payload = StockTransactionMapper.toCreate(dto);

    // บันทึก stock transaction
    const transaction =
      await this.stockTransactionRepository.create(
        payload,
        tx,
      );

    // แปลง response ก่อน return
    return StockTransactionMapper.toResponse(transaction);
  }

  // ======================================================
  // GET TRANSACTION BY ID
  // ======================================================
  async findOne(stock_transaction_id: number) {
    const transaction =
      await this.stockTransactionRepository.findOne(
        stock_transaction_id,
      );

    if (!transaction) {
      return null;
    }

    return StockTransactionMapper.toResponse(transaction);
  }

  // ======================================================
  // GET ALL TRANSACTIONS BY ITEM
  // ======================================================
  // ใช้ดู movement history ของสินค้า
  // ======================================================
  async findManyByItem(item_id: number) {
    const transactions =
      await this.stockTransactionRepository.findManyByItem(
        item_id,
      );

    return transactions.map((transaction) =>
      StockTransactionMapper.toResponse(transaction),
    );
  }

  // ======================================================
  // GET TRANSACTION BY DOCUMENT
  // ======================================================
  // ใช้ค้น movement จาก document เช่น:
  // - SALE_ORDER
  // - DELIVERY_ORDER
  // - PURCHASE_RECEIVE
  // ======================================================
  async findByRefDoc(
    ref_doc_type: string,
    ref_doc_no: string,
  ) {
    const transactions =
      await this.stockTransactionRepository.findByRefDoc(
        ref_doc_type,
        ref_doc_no,
      );

    return transactions.map((transaction) =>
      StockTransactionMapper.toResponse(transaction),
    );
  }
}