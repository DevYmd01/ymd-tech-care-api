import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import {
  LotTransactionType,
  LotRefDocType,
} from '../../../enums/lot-balance-type.enum';

import { LotBalanceService } from '../../../lot-balance.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class ReserveLotService {
  constructor(
    private readonly prisma: PrismaService,
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
    // FIND BALANCE
    // ======================================================
    const balance =
      await this.lotBalanceService.findOne(
        {
          item_id: data.item_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
          branch_id: data.branch_id,
          lot_id: data.lot_id,
        },
        tx,
      );

    if (!balance) {
      throw new BadRequestException(
        'Lot balance not found',
      );
    }

    // ======================================================
    // CHECK AVAILABLE QTY
    // ======================================================
    if (
      Number(balance.qty_available) <
      Math.abs(data.qty)
    ) {
      throw new BadRequestException(
        'Insufficient available quantity',
      );
    }

    // ======================================================
    // RESERVE STOCK
    // reserved เพิ่ม
    // available ลด
    // ======================================================
    const result =
      await tx.item_lot_balance.update({
        where: {
          item_id_lot_id_warehouse_id_location_id_branch_id:
            {
              item_id: data.item_id,
              lot_id: data.lot_id,
              warehouse_id: data.warehouse_id,
              location_id: data.location_id,
              branch_id: data.branch_id,
            },
        },

        data: {
          qty_reserved: {
            increment: new Prisma.Decimal(
              Math.abs(data.qty),
            ),
          },

          qty_available: {
            decrement: new Prisma.Decimal(
              Math.abs(data.qty),
            ),
          },
        },
      });

    // ======================================================
    // CREATE LOT TRANSACTION
    // ======================================================
    await tx.lot_transaction.create({
      data: {
        item_id: data.item_id,
        lot_id: data.lot_id,

        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
        branch_id: data.branch_id,

        qty: new Prisma.Decimal(data.qty),

        trans_type:
          data.trans_type ??
          LotTransactionType.RESERVE,

        ref_doc_type:
          data.ref_doc_type ??
          LotRefDocType.SYSTEM,

        ref_doc_no: data.ref_doc_no,

        remarks: data.remark,
      },
    });

    return {
      success: true,
      message:
        'Lot stock reserved successfully',

      item_id: data.item_id,
      lot_id: data.lot_id,

      reserved_qty: data.qty,

      result,
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
    if (data.qty <= 0) {
      throw new BadRequestException(
        'Reserve quantity must be greater than 0',
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