import { Prisma } from "@prisma/client";
import { CreateSaleOrderLineDto } from "../dto/create-sale-order-line.dto";

export class CreateSaleOrderLineMapper {
  static toPrismaCreateInput(
    data: CreateSaleOrderLineDto,
    calc: {
      subtotal: Prisma.Decimal | any;
      discountAmount: Prisma.Decimal | any;
      netAmount: Prisma.Decimal | any;
    },
    so_id: number,
  ): Prisma.sale_order_lineCreateInput {
    return {
      so_header: {
        connect: { so_id: so_id },
      },

      reservation_line: {
        connect: {
          reservation_line_id: data.reservation_line_id,
        },
      },

      item: {
        connect: { item_id: data.item_id },
      },

      warehouse: {
        connect: { warehouse_id: data.warehouse_id },
      },

      location: {
        connect: { location_id: data.location_id },
      },

      ...(data.lot_id
        ? {
            lot: {
              connect: { lot_id: data.lot_id },
            },
          }
        : {}),

      uom: {
        connect: { uom_id: data.uom_id },
      },

      note: data.note,
      qty: data.qty,
      unit_price: data.unit_price,

      discount_expression: data.discount_expression,
      discount_rate: data.discount_rate,
      discount_amount: calc.discountAmount,
      net_amount: calc.netAmount,
    };
  }
}