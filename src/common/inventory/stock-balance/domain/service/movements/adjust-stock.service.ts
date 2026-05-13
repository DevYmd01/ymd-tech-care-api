import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StockTransactionType } from '../../../enums/stock-balance-type.enum';
import { StockTransactionService } from '../../../../stock-transaction/stock-transaction.service';
import { StockBalanceService } from '../../../stock-balance.service';

@Injectable()
export class AdjustStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stockTransactionService: StockTransactionService,
    private readonly stockBalanceService: StockBalanceService,
  ) {}

//   ======================================================
//   EXECUTE ADJUSTMENT
//   ======================================================
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
    if (data.qty === 0) {
      throw new BadRequestException('Adjustment quantity cannot be 0');
    }

    return this.prisma.$transaction(async (tx) => {
      const locationId = data.location_id;

      // ==================================================
      // FIND CURRENT BALANCE (WITH TX)
      // ==================================================
      const balance = await this.stockBalanceService.findOne(
        {
          item_id: data.item_id,
          warehouse_id: data.warehouse_id,
          location_id: locationId,
          branch_id: data.branch_id,
        },
        tx,
      );

      // ==================================================
      // CHECK STOCK (prevent negative)
      // ==================================================
      if (data.qty < 0) {
        const deductQty = Math.abs(data.qty);

        if (!balance || Number(balance.qty_on_hand) < deductQty) {
          throw new BadRequestException('Insufficient stock for adjustment');
        }
      }

      // ==================================================
      // CREATE STOCK TRANSACTION
      // ==================================================
      await this.stockTransactionService.create(
        {
          item_id: data.item_id,
          warehouse_id: data.warehouse_id,
          location_id: locationId,
          branch_id: data.branch_id,
          qty: data.qty,
          trans_type: StockTransactionType.ADJUST,
          ref_doc_type: data.ref_doc_type ?? 'STOCK_ADJUST',
          ref_doc_no: data.ref_doc_no,
          remark: data.remark,
        },
        tx,
      );

      // ==================================================
      // UPDATE STOCK BALANCE (WITH TX)
      // ==================================================
      await this.stockBalanceService.adjust(
        {
          item_id: data.item_id,
          warehouse_id: data.warehouse_id,
          location_id: locationId,
          branch_id: data.branch_id,
          qty: data.qty,
        },
        tx,
      );

      // ==================================================
      // RETURN RESULT
      // ==================================================
      return {
        success: true,
        message: 'Stock adjusted successfully',
        item_id: data.item_id,
        warehouse_id: data.warehouse_id,
        adjustment_qty: data.qty,
      };
    });
  }
}