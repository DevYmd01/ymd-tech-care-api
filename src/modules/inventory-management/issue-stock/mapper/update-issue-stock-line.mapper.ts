import { Prisma } from "@prisma/client";
import { UpdateIssueStockLineDto } from "../dto/update-issue-stock-line.dto";

export class UpdateIssueStockLineMapper {
    static toPrismaUpdateInput(
        data: UpdateIssueStockLineDto,
        issue_stock_id?: number,
    ): Prisma.issue_stock_lineUpdateInput {
        return {
            ...(issue_stock_id && { issue_stock_header: { connect: { issue_stock_id: issue_stock_id } } }),
            ...(data.appvissue_req_line_id && { appvissue_requistion_line: { connect: { appvissue_req_line_id: data.appvissue_req_line_id } } }),
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