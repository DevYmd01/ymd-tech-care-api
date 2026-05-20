// preview.controller.ts

import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { PreviewService }
from './preview.service';

import {
  InventoryPreviewRequest,
} from './dto/inventory-preview.request';

@Controller('inventory-preview')
export class PreviewController {

  constructor(

    private readonly previewService:
      PreviewService,

  ) {}

  // =========================================================
  // PREVIEW STOCK LOT
  // =========================================================
  // หน้าที่:
  // - รับ request จาก frontend
  // - preview stock
  // - หา lot ตาม policy
  // - split qty
  // - ส่งข้อมูล lot กลับ
  //
  // หมายเหตุ:
  // - ยังไม่ commit stock
  // - ยังไม่ update database
  // =========================================================

  @Post()

  async preview(

    @Body()
    req: InventoryPreviewRequest,

  ) {

    return this.previewService.preview(
      req,
    );

  }

}