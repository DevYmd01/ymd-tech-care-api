import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AdjustStockService } from './adjust-stock.service';

@Injectable()
export class ReleaseStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adjustStockService: AdjustStockService,
  ) {}

  // ======================================================
  // RELEASE RESERVED STOCK
  // ======================================================
  // ใช้สำหรับ:
  // - ยกเลิก reservation
  // - ยกเลิก order
  // - คืน reserved กลับ available
  //
  // RESULT:
  // reserved  ลด
  // available เพิ่ม
  // on_hand   เท่าเดิม
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
        'Release quantity must be greater than 0',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // ==================================================
      // FIND BALANCE
      // ==================================================
      const balance =
        await tx.item_stock_balance.findUnique({
          where: {
            item_id_branch_id_warehouse_id_location_id:
              {
                item_id: data.item_id,
                warehouse_id: data.warehouse_id,
                location_id: data.location_id,
                branch_id: data.branch_id,
              },
          },
        });

      if (!balance) {
        throw new BadRequestException(
          'Stock balance not found',
        );
      }

      // ==================================================
      // CHECK RESERVED QTY
      // ==================================================
      if (
        Number(balance.qty_reserved) < data.qty
      ) {
        throw new BadRequestException(
          'Insufficient reserved quantity',
        );
      }

      // ==================================================
      // UPDATE RESERVED
      // ==================================================
      await tx.item_stock_balance.update({
        where: {
          item_id_branch_id_warehouse_id_location_id:
            {
              item_id: data.item_id,
              warehouse_id: data.warehouse_id,
              location_id: data.location_id,
              branch_id: data.branch_id,
            },
        },

        data: {
          qty_reserved: {
            decrement: data.qty,
          },

          qty_available: {
            increment: data.qty,
          },
        },
      });

      // ==================================================
      // CREATE TRANSACTION LOG
      // ==================================================
      await tx.stock_transaction.create({
        data: {
          item_id: data.item_id,

          warehouse_id: data.warehouse_id,

          location_id: data.location_id,

          branch_id: data.branch_id,

          qty: data.qty,

          trans_type: 'RELEASE',

          ref_doc_type:
            data.ref_doc_type ??
            'RELEASE_STOCK',

          ref_doc_no: data.ref_doc_no,

          remark: data.remark,
        },
      });

      // ==================================================
      // RETURN RESULT
      // ==================================================
      return {
        success: true,

        message:
          'Reserved stock released successfully',

        item_id: data.item_id,

        released_qty: data.qty,
      };
    });
  }
}