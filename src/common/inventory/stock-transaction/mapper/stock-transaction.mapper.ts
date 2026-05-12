import { Prisma } from '@prisma/client';

import { CreateStockTransactionDto } from '../dto/create-stock-transaction.dto';
import { StockTransactionInterface } from '../interfaces/stock-transaction.interface';

export class StockTransactionMapper {
  static toCreate(
    dto: CreateStockTransactionDto,
  ): Prisma.stock_transactionCreateInput {
    return {
      qty: new Prisma.Decimal(dto.qty),

      trans_type: dto.trans_type,

      ref_doc_type: dto.ref_doc_type ?? null,
      ref_doc_no: dto.ref_doc_no ?? null,
      ref_line_id: dto.ref_line_id ?? null,

      item: {
        connect: {
          item_id: dto.item_id,
        },
      },

      warehouse: {
        connect: {
          warehouse_id: dto.warehouse_id,
        },
      },

      ...(dto.branch_id && {
        branch: {
          connect: {
            branch_id: dto.branch_id,
          },
        },
      }),

      ...(dto.location_id && {
        location: {
          connect: {
            location_id: dto.location_id,
          },
        },
      }),
    };
  }

  static toResponse(data: any): StockTransactionInterface {
    return {
      stock_transaction_id: data.stock_transaction_id,

      item_id: data.item_id,

      branch_id: data.branch_id,

      warehouse_id: data.warehouse_id,

      location_id: data.location_id,

      qty: Number(data.qty),

      trans_type: data.trans_type,

      ref_doc_type: data.ref_doc_type,

      ref_doc_no: data.ref_doc_no,

      ref_line_id: data.ref_line_id,

      remark: data.remark,

      created_at: data.created_at,
    };
  }
}