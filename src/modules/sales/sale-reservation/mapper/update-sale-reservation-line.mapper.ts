import { Prisma } from "@prisma/client";
import { UpdateSaleReservationLineDto } from "../dto/update-sale-reservation-line.dto";

export class UpdateSaleReservationLineMapper { // Renamed file, class name remains the same
    static toPrismaUpdateInput(
        data: UpdateSaleReservationLineDto,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        },
    ): Prisma.sale_reservation_lineUpdateInput {
        return {
            ...(data.item_id && { item: { connect: { item_id: data.item_id } } }),
            ...(data.warehouse_id && { warehouse: { connect: { warehouse_id: data.warehouse_id } } }),
            ...(data.location_id && { location: { connect: { location_id: data.location_id } } }),
            ...(data.uom_id && { uom: { connect: { uom_id: data.uom_id } } }),

            ...(data.lot_id === null && { lot: { disconnect: true } }),
            ...(data.lot_id && { lot: { connect: { lot_id: data.lot_id } } }),

            ...(data.note !== undefined && { note: data.note }),
            ...(data.qty !== undefined && { qty: data.qty }),
            ...(data.unit_price !== undefined && { unit_price: data.unit_price }),

            ...(data.discount_expression !== undefined && {
                discount_expression: data.discount_expression
            }),
            ...(data.discount_rate !== undefined && {
                discount_rate: data.discount_rate
            }),

            discount_amount: calc.discountAmount,
            net_amount: calc.netAmount,
        };
    }
}