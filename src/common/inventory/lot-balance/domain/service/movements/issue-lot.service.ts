import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import {
  LotTransactionType,
  LotRefDocType,
} from '../../../enums/lot-balance-type.enum';

import { AdjustLotService } from './adjust-lot.service';

@Injectable()
export class IssueLotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adjustStockService: AdjustLotService,
  ) {}

  // ======================================================
  // ISSUE LOT STOCK
  // ======================================================
  async execute(data: {
    item_id: number;
    warehouse_id: number;
    location_id: number;
    branch_id: number;
    lot_id: number;

    qty: number;

    remark?: string;

    ref_doc_no?: string;

    trans_type?: LotTransactionType;
    ref_doc_type?: LotRefDocType;
  }) {
    // ======================================================
    // VALIDATE
    // ======================================================
    if (data.qty <= 0) {
      throw new BadRequestException(
        'Issue quantity must be greater than 0',
      );
    }

    // ======================================================
    // TRANSACTION
    // ======================================================
    return this.prisma.$transaction(async (tx) => {
      // ISSUE = ลด stock
      const result =
        await this.adjustStockService.execute(
          {
            item_id: data.item_id,
            warehouse_id: data.warehouse_id,
            location_id: data.location_id,
            branch_id: data.branch_id,
            lot_id: data.lot_id,

            qty: -Math.abs(data.qty),

            remark: data.remark,

            trans_type:
              data.trans_type ??
              LotTransactionType.ISSUE,

            ref_doc_type:
              data.ref_doc_type ??
              LotRefDocType.ISSUE_STOCK,

            ref_doc_no: data.ref_doc_no,
          },
          tx,
        );

      return {
        success: true,
        message: 'Lot stock issued successfully',

        item_id: data.item_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
        branch_id: data.branch_id,
        lot_id: data.lot_id,

        issued_qty: data.qty,

        result,
      };
    });
  }
}