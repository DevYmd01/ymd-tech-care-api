import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { AdjustStockService } from './adjust-stock.service';

@Injectable()
export class TransferStockService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly adjustStockService: AdjustStockService,
  ) {}

  // ======================================================
  // TRANSFER STOCK
  // ======================================================
  // ใช้สำหรับ:
  // - ย้าย stock ระหว่าง warehouse
  // - ย้าย stock ระหว่าง location
  // - ย้าย stock ระหว่าง branch
  //
  // RESULT:
  // SOURCE      => stock ลด
  // DESTINATION => stock เพิ่ม
  // ======================================================
  async execute(data: {
    item_id: number;

    from_warehouse_id: number;
    from_location_id: number;
    from_branch_id: number;

    to_warehouse_id: number;
    to_location_id: number;
    to_branch_id: number;

    qty: number;

    remark?: string;

    ref_doc_type?: string;

    ref_doc_no?: string;
  }) {
    if (data.qty <= 0) {
      throw new BadRequestException(
        'Transfer quantity must be greater than 0',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // ==================================================
      // STEP 1:
      // DEDUCT FROM SOURCE
      // ==================================================
      await this.adjustStockService.execute(
        {
          item_id: data.item_id,

          warehouse_id: data.from_warehouse_id,

          location_id: data.from_location_id,

          branch_id: data.from_branch_id,

          qty: -Math.abs(data.qty),

          remark: data.remark,

          ref_doc_type:
            data.ref_doc_type ??
            'TRANSFER_OUT',

          ref_doc_no: data.ref_doc_no,
        },
        tx,
      );

      // ==================================================
      // STEP 2:
      // ADD TO DESTINATION
      // ==================================================
      await this.adjustStockService.execute(
        {
          item_id: data.item_id,

          warehouse_id: data.to_warehouse_id,

          location_id: data.to_location_id,

          branch_id: data.to_branch_id,

          qty: Math.abs(data.qty),

          remark: data.remark,

          ref_doc_type:
            data.ref_doc_type ??
            'TRANSFER_IN',

          ref_doc_no: data.ref_doc_no,
        },
        tx,
      );

      // ==================================================
      // RETURN RESULT
      // ==================================================
      return {
        success: true,

        message: 'Stock transferred successfully',

        item_id: data.item_id,

        transfer_qty: data.qty,

        from: {
          warehouse_id: data.from_warehouse_id,
          location_id: data.from_location_id,
          branch_id: data.from_branch_id,
        },

        to: {
          warehouse_id: data.to_warehouse_id,
          location_id: data.to_location_id,
          branch_id: data.to_branch_id,
        },
      };
    });
  }
}