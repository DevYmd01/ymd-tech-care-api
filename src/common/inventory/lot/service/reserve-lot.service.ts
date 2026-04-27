/**
 * ============================================================
 * File: src/common/inventory/lot/service/reserve-lot.service.ts
 * ============================================================
 * หน้าที่:
 * หลังจาก allocate LOT ได้แล้ว
 * ทำการ "จองสินค้า" จริงในระบบ
 *
 * โดยจะ:
 * 1. update item_lot_balance
 *    - qty_reserved +
 *    - qty_available -
 *
 * 2. update item_stock_balance
 *    - qty_reserved +
 *    - qty_available -
 *
 * 3. ใช้ transaction กันข้อมูลพัง
 *
 * ============================================================
 */

import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

type ReserveLotItem = {
  lot_id: number;
  qty: number;
};

@Injectable()
export class ReserveLotService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * execute()
   *
   * @param itemId       รหัสสินค้า
   * @param branchId     สาขา
   * @param warehouseId  คลัง
   * @param allocations  LOT ที่ allocate มาแล้ว
   *
   * ตัวอย่าง allocations:
   * [
   *   { lot_id: 1, qty: 100 },
   *   { lot_id: 2, qty: 20 }
   * ]
   */
  async execute(
    itemId: number,
    branchId: number,
    warehouseId: number,
    allocations: ReserveLotItem[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      /**
       * ====================================================
       * STEP 1:
       * update LOT balance ทีละ lot
       * ====================================================
       */
      for (const row of allocations) {
        /**
         * หา lot balance ปัจจุบัน
         */
        const lotBalance =
          await tx.item_lot_balance.findFirst({
            where: {
              lot_id: row.lot_id,
              item_id: itemId,
              branch_id: branchId,
              warehouse_id: warehouseId,
            },
          });

        if (!lotBalance) {
          throw new BadRequestException(
            `Lot balance not found: ${row.lot_id}`,
          );
        }

        /**
         * เช็ค available พอไหม
         */
        if (
          Number(lotBalance.qty_available) <
          row.qty
        ) {
          throw new BadRequestException(
            `Lot ${row.lot_id} stock not enough`,
          );
        }

        /**
         * update lot balance
         */
        await tx.item_lot_balance.update({
          where: {
            lot_balance_id:
              lotBalance.lot_balance_id,
          },
          data: {
            qty_reserved: {
              increment: row.qty,
            },
            qty_available: {
              decrement: row.qty,
            },
          },
        });
      }

      /**
       * ====================================================
       * STEP 2:
       * update stock balance รวมสินค้า
       * ====================================================
       */
      const totalReserveQty =
        allocations.reduce(
          (sum, row) => sum + row.qty,
          0,
        );

      const stockBalance =
        await tx.item_stock_balance.findFirst({
          where: {
            item_id: itemId,
            branch_id: branchId,
            warehouse_id: warehouseId,
          },
        });

      if (!stockBalance) {
        throw new BadRequestException(
          'Stock balance not found',
        );
      }

      if (
        Number(stockBalance.qty_available) <
        totalReserveQty
      ) {
        throw new BadRequestException(
          'Stock available not enough',
        );
      }

      await tx.item_stock_balance.update({
        where: {
          stock_balance_id:
            stockBalance.stock_balance_id,
        },
        data: {
          qty_reserved: {
            increment: totalReserveQty,
          },
          qty_available: {
            decrement: totalReserveQty,
          },
        },
      });

      /**
       * ====================================================
       * STEP 3:
       * return success
       * ====================================================
       */
      return {
        success: true,
        reserved_qty: totalReserveQty,
      };
    });
  }
}