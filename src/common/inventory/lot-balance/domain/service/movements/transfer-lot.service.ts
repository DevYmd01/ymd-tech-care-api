import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import {
  LotTransactionType,
  LotRefDocType,
} from '../../../enums/lot-balance-type.enum';

import { AdjustLotService } from './adjust-lot.service';

import { Prisma } from '@prisma/client';

@Injectable()
export class TransferLotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adjustLotService: AdjustLotService,
  ) {}

  // ======================================================
  // PUBLIC EXECUTE
  // ======================================================
  async execute(
    data: {
      item_id: number;

      from_warehouse_id: number;
      from_location_id: number;
      from_branch_id: number;
      from_lot_id: number;

      to_warehouse_id: number;
      to_location_id: number;
      to_branch_id: number;
      to_lot_id: number;

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
        'Transfer quantity must be greater than 0',
      );
    }

    // ======================================================
    // SAME LOCATION CHECK
    // ======================================================
    if (
      data.from_warehouse_id ===
        data.to_warehouse_id &&
      data.from_location_id ===
        data.to_location_id &&
      data.from_branch_id ===
        data.to_branch_id &&
      data.from_lot_id ===
        data.to_lot_id
    ) {
      throw new BadRequestException(
        'Cannot transfer to same location and lot',
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

  // ======================================================
  // INTERNAL EXECUTE
  // ======================================================
  private async executeInternal(
    data: {
      item_id: number;

      from_warehouse_id: number;
      from_location_id: number;
      from_branch_id: number;
      from_lot_id: number;

      to_warehouse_id: number;
      to_location_id: number;
      to_branch_id: number;
      to_lot_id: number;

      qty: number;

      remark?: string;
      ref_doc_no?: string;

      trans_type?: LotTransactionType;
      ref_doc_type?: LotRefDocType;
    },
    tx: Prisma.TransactionClient,
  ) {
    // ==================================================
    // STEP 1: TRANSFER OUT
    // ==================================================
    await this.adjustLotService.execute(
      {
        item_id: data.item_id,

        warehouse_id:
          data.from_warehouse_id,

        location_id:
          data.from_location_id,

        branch_id:
          data.from_branch_id,

        lot_id: data.from_lot_id,

        qty: -Math.abs(data.qty),

        trans_type:
          data.trans_type ??
          LotTransactionType.TRANSFER,

        ref_doc_type:
          LotRefDocType.TRANSFER_OUT,

        ref_doc_no: data.ref_doc_no,

        remark: data.remark,
      },
      tx,
    );

    // ==================================================
    // STEP 2: TRANSFER IN
    // ==================================================
    await this.adjustLotService.execute(
      {
        item_id: data.item_id,

        warehouse_id:
          data.to_warehouse_id,

        location_id:
          data.to_location_id,

        branch_id:
          data.to_branch_id,

        lot_id: data.to_lot_id,

        qty: Math.abs(data.qty),

        trans_type:
          data.trans_type ??
          LotTransactionType.TRANSFER,

        ref_doc_type:
          LotRefDocType.TRANSFER_IN,

        ref_doc_no: data.ref_doc_no,

        remark: data.remark,
      },
      tx,
    );

    return {
      success: true,
      message:
        'Lot stock transferred successfully',

      item_id: data.item_id,

      transfer_qty: data.qty,

      from: {
        warehouse_id:
          data.from_warehouse_id,

        location_id:
          data.from_location_id,

        branch_id:
          data.from_branch_id,

        lot_id: data.from_lot_id,
      },

      to: {
        warehouse_id:
          data.to_warehouse_id,

        location_id:
          data.to_location_id,

        branch_id:
          data.to_branch_id,

        lot_id: data.to_lot_id,
      },
    };
  }
}