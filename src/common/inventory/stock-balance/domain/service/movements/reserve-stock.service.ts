import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { StockTransactionService } from '../../../../stock-transaction/stock-transaction.service';
import { StockTransactionType } from '../../../enums/stock-balance-type.enum';

@Injectable()
export class ReserveStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  // ======================================================
  // RESERVE STOCK
  // ======================================================
  async execute(data: {
    item_id: number;
    warehouse_id: number;
    location_id: number;
    branch_id: number;
    qty: number;
    remark?: string;
    ref_doc_type?: string;
    ref_doc_no?: string;
  }) {
    if (data.qty <= 0) {
      throw new BadRequestException(
        'Reserve quantity must be greater than 0',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // ======================================================
      // FIND STOCK BALANCE
      // ======================================================
      const stock =
        await tx.item_stock_balance.findUnique({
          where: {
            item_id_branch_id_warehouse_id_location_id:
              {
                item_id: data.item_id,
                branch_id: data.branch_id,
                warehouse_id: data.warehouse_id,
                location_id: data.location_id,
              },
          },
        });

      if (!stock) {
        throw new BadRequestException(
          'Stock balance not found',
        );
      }

      // ======================================================
      // VALIDATE AVAILABLE STOCK
      // ======================================================
      const availableQty = Number(
        stock.qty_available,
      );

      if (availableQty < data.qty) {
        throw new BadRequestException(
          'Insufficient available stock',
        );
      }

      // ======================================================
      // UPDATE RESERVED / AVAILABLE
      // ======================================================
      const updatedStock =
        await tx.item_stock_balance.update({
          where: {
            stock_balance_id:
              stock.stock_balance_id,
          },

          data: {
            qty_reserved: {
              increment: new Prisma.Decimal(
                data.qty,
              ),
            },

            qty_available: {
              decrement: new Prisma.Decimal(
                data.qty,
              ),
            },
          },
        });

      // ======================================================
      // CREATE STOCK TRANSACTION
      // ======================================================
      await this.stockTransactionService.create(
        {
          item_id: data.item_id,
          branch_id: data.branch_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,

          trans_type:
            StockTransactionType.RESERVE,

          qty: Number(new Prisma.Decimal(data.qty)),

          remark: data.remark,

          ref_doc_type:
            data.ref_doc_type ??
            'RESERVE_STOCK',

          ref_doc_no: data.ref_doc_no,
        },
        tx,
      );

      return updatedStock;
    });
  }
}