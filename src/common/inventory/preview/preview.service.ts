// preview.service.ts

import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { AllocationService }
  from '../lot-balance/application/allocation.service';

import {
  InventoryPreviewRequest,
} from './dto/inventory-preview.request';

import {
  InventoryPreviewResponse,
} from './dto/inventory-preview.response';

import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class PreviewService {

  constructor(private readonly prisma: PrismaService) { }


  // =========================================================
  // PREVIEW INVENTORY STOCK
  // =========================================================
  // หน้าที่:
  // - รับ request จาก frontend
  // - validate request
  // - หา issue policy
  // - เรียก allocation engine
  // - หา lot ที่ใช้งานได้
  // - split qty ตาม policy
  // - ส่งข้อมูล preview กลับ
  //
  // หมายเหตุ:
  // - ยังไม่ commit stock
  // - ยังไม่ update database
  // =========================================================

  async preview(

    req: InventoryPreviewRequest,

  ): Promise<InventoryPreviewResponse> {

    // =====================================================
    // VALIDATE REQUEST
    // =====================================================

    if (!req.item_id) {

      throw new BadRequestException(
        'ITEM_ID_REQUIRED',
      );
    }

    if (!req.qty || req.qty <= 0) {

      throw new BadRequestException(
        'INVALID_QTY',
      );
    }

    // =====================================================
    // LOAD ISSUE POLICY
    // =====================================================
    // TODO:
    // อนาคตดึงจาก:
    // item.default_issue_policy
    //
    // FIFO
    // FEFO
    // LIFO
    // MANUAL
    // =====================================================

    const itemPolicy =
      await this.prisma.item.findUnique({

        where: {
          item_id: req.item_id,
        },

        select: {
          default_issue_policy: true,
        },

      });

    if (!itemPolicy) {

      throw new BadRequestException(
        'ITEM_NOT_FOUND',
      );

    }

    const issuePolicy =

      itemPolicy.default_issue_policy
      ?? 'FIFO';
    // =====================================================
    // CALL ALLOCATION ENGINE
    // =====================================================

    const allocationResult =
      await AllocationService.allocate({

        item_id:
          req.item_id,

        warehouse_id:
          req.warehouse_id,

        location_id:
          req.location_id,

        qty:
          req.qty,

        issue_policy:
          issuePolicy,

      });

    // =====================================================
    // PREPARE RESPONSE
    // =====================================================

    const allocations =

      allocationResult.allocations.map(
        (row: any) => ({

          lot_id:
            Number(row.lot_id),

          lot_no:
            row.lot_no ?? '',

          qty:
            Number(row.qty),

          available_qty:
            Number(
              row.available_qty ?? 0
            ),

          warehouse_id:
            row.warehouse_id
              ? Number(row.warehouse_id)
              : undefined,

          location_id:
            row.location_id
              ? Number(row.location_id)
              : undefined,

          expiry_date:
            row.expiry_date ?? null,

        })
      );

    // =====================================================
    // RETURN RESPONSE
    // =====================================================

    return {

      success:
        allocationResult.success,

      policy:
        issuePolicy,

      allocations,

      missing_qty:
        Number(
          allocationResult.missing_qty ?? 0
        ),

      message:
        allocationResult.success
          ? 'PREVIEW SUCCESS'
          : 'INSUFFICIENT STOCK',

    };

  }

}