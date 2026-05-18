import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import {
  LotTransactionType,
  LotRefDocType,
} from '../../../enums/lot-balance-type.enum';

import { LotTransactionService } from '../../../../lot-transaction/lot-transaction.service';
import { LotBalanceService } from '../../../lot-balance.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class AdjustLotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lotTransactionService: LotTransactionService,
    private readonly lotBalanceService: LotBalanceService,
  ) {}

  // ======================================================
  // INTERNAL EXECUTE
  // ======================================================
  private async executeInternal(
    data: {
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
    },
    tx: Prisma.TransactionClient,
  ) {
    // ======================================================
    // FIND LOT BALANCE
    // ======================================================
    const balance = await this.lotBalanceService.findOne(
      {
        item_id: data.item_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
        branch_id: data.branch_id,
        lot_id: data.lot_id,
      },
      tx,
    );

    // ======================================================
    // CHECK NEGATIVE STOCK
    // ======================================================
    if (data.qty < 0) {
      const deductQty = Math.abs(data.qty);

      if (!balance || Number(balance.qty_on_hand) < deductQty) {
        throw new BadRequestException(
          'Insufficient stock for adjustment',
        );
      }
    }

    // ======================================================
    // CREATE STOCK TRANSACTION
    // ======================================================
   await this.lotTransactionService.create(
  {
    item_id: data.item_id,
    warehouse_id: data.warehouse_id,
    location_id: data.location_id,
    branch_id: data.branch_id,
    lot_id: data.lot_id,

    qty: data.qty,

    trans_type:
      data.trans_type ??
      LotTransactionType.ADJUST,

    ref_doc_type:
      data.ref_doc_type ??
      LotRefDocType.ADJUST_STOCK,

    ref_doc_no: data.ref_doc_no,

    remark: data.remark,
  },
  tx,
);

    // ======================================================
    // UPDATE LOT BALANCE
    // ======================================================
    await this.lotBalanceService.adjust(
      {
        item_id: data.item_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
        branch_id: data.branch_id,
        lot_id: data.lot_id,

        qty: data.qty,
      },
      tx,
    );

    return {
      success: true,
      message: 'Stock adjusted successfully',

      item_id: data.item_id,
      warehouse_id: data.warehouse_id,
      location_id: data.location_id,
      branch_id: data.branch_id,
      lot_id: data.lot_id,

      adjustment_qty: data.qty,
    };
  }

  // ======================================================
  // PUBLIC EXECUTE
  // ======================================================
  async execute(
    data: {
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
    },
    tx?: Prisma.TransactionClient,
  ) {
    // ======================================================
    // VALIDATE
    // ======================================================
    if (data.qty === 0) {
      throw new BadRequestException(
        'Adjustment quantity cannot be 0',
      );
    }

    // ======================================================
    // USE EXISTING TRANSACTION
    // ======================================================
    if (tx) {
      return this.executeInternal(data, tx);
    }

    // ======================================================
    // CREATE NEW TRANSACTION
    // ======================================================
    return this.prisma.$transaction(async (trx) => {
      return this.executeInternal(data, trx);
    });
  }
}