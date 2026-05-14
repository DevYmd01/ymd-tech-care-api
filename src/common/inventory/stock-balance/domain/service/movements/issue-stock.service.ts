import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StockTransactionType, StockRefDocType } from '../../../enums/stock-balance-type.enum';
import { AdjustStockService } from './adjust-stock.service';

@Injectable()
export class IssueStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adjustStockService: AdjustStockService,
  ) {}

  // ======================================================
  // ISSUE STOCK (SELL / WITHDRAW / CONSUME)
  // ======================================================
 async execute(data: {
  item_id: number;
  warehouse_id: number;
  location_id: number;
  branch_id: number;
  qty: number;
  remark?: string;
  ref_doc_type?: StockRefDocType;
  ref_doc_no?: string;
}) {
  if (data.qty <= 0) {
    throw new BadRequestException(
      'Issue quantity must be greater than 0',
    );
  }

  // business logic
  const adjustmentQty = -Math.abs(data.qty);

  return this.prisma.$transaction(async (tx) => {
    return  this.adjustStockService.execute(
      {
        item_id: data.item_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
        branch_id: data.branch_id,
        qty: adjustmentQty,
        remark: data.remark,
        trans_type: StockTransactionType.ISSUE,   // ✔ FIXED
        ref_doc_type: data.ref_doc_type ?? StockRefDocType.ISSUE_STOCK,     // ✔ FIXED
        ref_doc_no: data.ref_doc_no,
      },
      tx,
    );
  });
}
}