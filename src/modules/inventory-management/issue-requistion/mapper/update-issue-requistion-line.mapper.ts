import { Prisma } from "@prisma/client";
import { UpdateIssueRequistionLineDto } from "../dto/update-issue-requistion-line.dto"; 

export class UpdateIssueRequistionLineMapper {
    static toPrismaUpdateInput(
        data: UpdateIssueRequistionLineDto,
        issue_req_id: number,
    ): Prisma.issue_requistion_lineUpdateInput {
        return {
            item: { connect: { item_id: data.item_id } },
            qty: new Prisma.Decimal(data.qty),
            uom: { connect: { item_uom_id: data.uom_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            location: { connect: { location_id: data.location_id } },
            lot: { connect: { lot_id: data.lot_id } },
            lot_balance: { connect: { lot_balance_id: data.lot_balance_id } },
            issue_req_header: { connect: { issue_req_id: issue_req_id } },
        };
    }   
}