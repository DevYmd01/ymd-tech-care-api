import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StockTransactionType } from '../../../enums/stock-balance-type.enum';
import { AdjustStockService } from './adjust-stock.service';

@Injectable()
export class ReceiveStockService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adjustStockService: AdjustStockService,
  ) {}

  // ======================================================
  // RECEIVE STOCK (PURCHASE / INBOUND)
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
      throw new BadRequestException('Receive quantity must be greater than 0');
    }

    return this.prisma.$transaction(async (tx) => {
      // RECEIVE = เพิ่ม stock → ใช้ +qty
      const result = await this.adjustStockService.execute(
        {
          item_id: data.item_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
          branch_id: data.branch_id,
          qty: Math.abs(data.qty), // + เพิ่ม stock
          remark: data.remark,
          ref_doc_type: data.ref_doc_type ?? 'RECEIVE_STOCK',
          ref_doc_no: data.ref_doc_no,
        },
        tx,
      );

      return {
        success: true,
        message: 'Stock received successfully',
        item_id: data.item_id,
        received_qty: data.qty,
        result,
      };
    });
  }
}