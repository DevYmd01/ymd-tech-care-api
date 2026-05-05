import { Prisma } from "@prisma/client";
import { UpdateSaleOrderLineDto } from "../dto/update-sale-order-line.dto";

export class UpdateSaleOrderLineMapper {
  static toPrismaUpdateInput(
    data: UpdateSaleOrderLineDto,
    calc: {
      subtotal: Prisma.Decimal;
      discountAmount: Prisma.Decimal;
      netAmount: Prisma.Decimal;
    },
    so_id: number,
  ): Prisma.sale_order_lineUpdateInput {
    return {
      // ❗ connect เฉพาะมีค่า (กัน undefined แล้ว Prisma พัง)
      ...(so_id && {
        so_header: {
          connect: { so_id },
        },
      }),

      ...(data.reservation_line_id && {
        reservation_line: {
          connect: {
            reservation_line_id: data.reservation_line_id,
          },
        },
      }),

      ...(data.item_id && {
        item: {
          connect: { item_id: data.item_id },
        },
      }),

      ...(data.warehouse_id && {
        warehouse: {
          connect: { warehouse_id: data.warehouse_id },
        },
      }),

      ...(data.location_id && {
        location: {
          connect: { location_id: data.location_id },
        },
      }),

      ...(data.lot_id && {
        lot: {
          connect: { lot_id: data.lot_id },
        },
      }),

      ...(data.uom_id && {
        uom: {
          connect: { uom_id: data.uom_id },
        },
      }),

      // ❗ string ต้อง allow "" และไม่ overwrite ถ้า undefined
      ...(data.note !== undefined && { note: data.note }),

      // ❗ number field ต้องเช็ค undefined
      ...(data.qty !== undefined && { qty: data.qty }),
      ...(data.unit_price !== undefined && {
        unit_price: data.unit_price,
      }),

      ...(data.discount_expression !== undefined && {
        discount_expression: data.discount_expression,
      }),

      ...(data.discount_rate !== undefined && {
        discount_rate: data.discount_rate,
      }),

      // ✅ ใช้ Decimal ตรง ๆ (ห้าม toNumber)
      discount_amount:
        calc.discountAmount ?? new Prisma.Decimal(0),

      net_amount:
        calc.netAmount ?? new Prisma.Decimal(0),
    };
  }
}