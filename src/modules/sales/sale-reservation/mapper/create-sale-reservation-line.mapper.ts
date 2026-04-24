import { Prisma } from "@prisma/client";
import { CreateSaleReservationLineDto } from "../dto/create-sale-reservation-line.dto";

export class CreateSaleReservationLineMapper {
  static toPrismaCreateInput(
    data: CreateSaleReservationLineDto,
    calc: {
      subtotal: Prisma.Decimal | any;
      discountAmount: Prisma.Decimal | any;
      netAmount: Prisma.Decimal | any;
    },
    rs_id: number,
  ): Prisma.sale_reservation_lineCreateInput {
    return {
      reservation_header: { connect: { reservation_id: rs_id } },
      
      item: { connect: { item_id: data.item_id } },
      warehouse: { connect: { warehouse_id: data.warehouse_id } },
      location: { connect: { location_id: data.location_id } },
      
      // เชื่อม Lot เฉพาะเมื่อมีข้อมูลส่งมา
      ...(data.lot_id 
        ? { lot: { connect: { lot_id: data.lot_id } } } 
        : {}),
        
      uom: { connect: { uom_id: data.uom_id } },

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