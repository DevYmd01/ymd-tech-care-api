import { Prisma } from "@prisma/client";
import { CreateApprovedIssueRequisitionLineDto } from "../dto/create-appv-issue-req-line.dto";

export class CreateAppvIssueReqLineMapper {
    static toPrismaCreateInput(
        data: CreateApprovedIssueRequisitionLineDto,
        appv_issue_req_id: number
    ): Prisma.appvissue_requistion_lineCreateInput {
        return {
            item: { connect: { item_id: data.item_id } },
            qty: new Prisma.Decimal(data.qty),
                approved_qty: new Prisma.Decimal(data.approved_qty),
            uom: { connect: { item_uom_id: data.uom_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            location: { connect: { location_id: data.location_id } },
            lot: { connect: { lot_id: data.lot_id } },
            lot_balance: { connect: { lot_balance_id: data.lot_balance_id } },
            appvissue_requistion_header: { connect: { appv_issue_req_id: appv_issue_req_id } },
        };
    }
} 