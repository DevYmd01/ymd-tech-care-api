import { Prisma } from "@prisma/client";
import { UpdateReturnStockLineDto } from "../dto/update-return-stock-line.dto";

export class UpdateReturnStockLineMapper {
    static toPrismaUpdateInput(
        data: UpdateReturnStockLineDto,
        return_stock_id?: number,
    ): Prisma.return_issue_stock_lineUpdateInput {
        return {
            ...(return_stock_id && { return_stock_header: { connect: { return_stock_id: return_stock_id } } }),
            ...(data.issue_stock_line_id && { issue_stock_line: { connect: { issue_stock_line_id: data.issue_stock_line_id } } }),
            ...(data.item_id && { item: { connect: { item_id: data.item_id } } }),
            ...(data.uom_id && { uom: { connect: { item_uom_id: data.uom_id } } }),
            ...(data.warehouse_id && { warehouse: { connect: { warehouse_id: data.warehouse_id } } }),
            ...(data.location_id && { location: { connect: { location_id: data.location_id } } }),
            ...(data.lot_id && { lot: { connect: { lot_id: data.lot_id } } }),
            ...(data.lot_balance_id && { lot_balance: { connect: { lot_balance_id: data.lot_balance_id } } }),

            ...(data.qty !== undefined && { qty: new Prisma.Decimal(data.qty) }),
            ...(data.unit_cost_price !== undefined && { unit_cost_price: new Prisma.Decimal(data.unit_cost_price) }),
            ...(data.unit_cost_price !== undefined && data.qty !== undefined && {
                goods_amount: new Prisma.Decimal(data.unit_cost_price).mul(new Prisma.Decimal(data.qty))
            }),
            ...(data.unit_cost_price !== undefined && { standard_buy_price: new Prisma.Decimal(data.unit_cost_price) }),
            ...(data.unit_cost_price !== undefined && { standard_cost_price: new Prisma.Decimal(data.unit_cost_price) }),
        };
    }
}
