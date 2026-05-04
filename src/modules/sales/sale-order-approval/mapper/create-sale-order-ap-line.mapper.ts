import { Prisma } from '@prisma/client';
import { CreateSaleOrderApprovalLineDto } from '../dto/create-sale-order-ap-line.dto';

export class CreateSaleOrderApprovalLineMapper {
  static toPrismaCreateInput(
    dto: CreateSaleOrderApprovalLineDto,
    soApprovalHeaderId: number, // ID ของ Sale Order Approval Header ที่เกี่ยวข้อง
    lineDocTotals?: any, // อ็อบเจกต์สำหรับเก็บผลรวมที่คำนวณได้ของแต่ละรายการ (optional)
  ): Prisma.sale_order_approval_lineCreateInput {
    return {
      so_approval: {
        connect: { so_approval_id: soApprovalHeaderId },
      },
      so_line: {
        connect: { so_line_id: dto.so_line_id },
      },
      item: {
        connect: { item_id: dto.item_id },
      },
      uom: {
        connect: { uom_id: dto.uom_id },
      },
      approved_qty: dto.approved_qty,
      qty: dto.qty,
      unit_price: dto.unit_price,
      remarks: dto.remarks,
      discount_expression: dto.discount_expression,
      discount_rate: lineDocTotals.discount_rate,
      discount_amount: lineDocTotals.discountAmount,
      net_amount: lineDocTotals.netAmount,
    };
  }
}