import { Prisma } from "@prisma/client";
import { CreateIssueStockLineDto } from "../dto/create-issue-stock-line.dto";

export class CreateIssueStockLineMapper {
    static toPrismaCreateInput(
        data: CreateIssueStockLineDto,
        issue_stock_id: number,
    ): Prisma.issue_stock_lineCreateInput {
        return {
            appvissue_requistion_line: { connect: { appvissue_req_line_id: data.appvissue_req_line_id } },
            item: { connect: { item_id: data.item_id } },
            qty: new Prisma.Decimal(data.qty),
            uom: { connect: { item_uom_id: data.uom_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            location: { connect: { location_id: data.location_id } },
            lot: { connect: { lot_id: data.lot_id } },
            lot_balance: { connect: { lot_balance_id: data.lot_balance_id } },

            unit_cost_price: new Prisma.Decimal(data.unit_cost_price),
            goods_amount: new Prisma.Decimal(data.unit_cost_price).mul(new Prisma.Decimal(data.qty)),
            standard_buy_price: new Prisma.Decimal(data.unit_cost_price),
            standard_cost_price: new Prisma.Decimal(data.unit_cost_price),
            issue_stock_header: { connect: { issue_stock_id: issue_stock_id } },
        };
    }

}