import { Prisma } from "@prisma/client";
import { CreateGrnLineDto } from "../dto/create-grn-line.dto";

export class CreateGrnLineMapper {
    static toPrismaCreateInput(
        data: CreateGrnLineDto,
        grn_id: number,
        line_no: number,
    ): Prisma.grn_lineCreateInput {
        return {
            grn_header: { connect: { grn_id: grn_id } },
            po_line: { connect: { po_line_id: data.po_line_id } },
            line_no: line_no,
            item: { connect: { item_id: data.item_id } },
            remarks: data.remarks,
            qty_received: data.qty_received,
            item_uom: { connect: { item_uom_id: data.uom_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            location: { connect: { location_id: data.location_id } },
            lot: { connect: { lot_id: data.lot_id } },
            lot_balance: { connect: { lot_balance_id: data.lot_balance_id } },
            status: data.status,
        }
    }

}
