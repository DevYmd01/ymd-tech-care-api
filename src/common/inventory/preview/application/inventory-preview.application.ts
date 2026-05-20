// inventory-preview.application.ts

import { PreviewService }
from '../preview.service';

import {
  InventoryPreviewRequest,
} from '../dto/inventory-preview.request';

import {
  InventoryPreviewResponse,
} from '../dto/inventory-preview.response';

export class InventoryPreviewApplication {

  // =========================================================
  // PREVIEW INVENTORY
  // =========================================================
  // หน้าที่:
  // - รับ request จาก controller
  // - เรียก preview service
  // - ส่งผลกลับ frontend
  //
  // หมายเหตุ:
  // - ยังไม่ commit stock
  // - ยังไม่ update database
  // =========================================================

  static async execute(

    service: PreviewService,

    req: InventoryPreviewRequest,

  ): Promise<InventoryPreviewResponse> {

    // =====================================================
    // CALL PREVIEW SERVICE
    // =====================================================

    const result =
      await service.preview(req);

    // =====================================================
    // RETURN RESULT
    // =====================================================

    return result;

  }

}