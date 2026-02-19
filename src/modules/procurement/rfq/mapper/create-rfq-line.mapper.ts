import { Prisma } from "@prisma/client";
import { CreateRFQLineDTO } from "../dto/create-rfq-line.dto";

export class CreateRFQLineMapper {
    static toPrismaCreateInput(
        lines: CreateRFQLineDTO[],
        rfq_id: number
    ): Prisma.rfq_lineCreateManyInput[] {

        return lines.map(line => ({
            rfq_id: rfq_id,

            line_no: line.line_no,

            pr_line_id: line.pr_line_id,

            item_id: line.item_id,

            description: line.description,

            qty: line.qty,

            uom_id: line.uom_id,

            required_receipt_type: line.required_receipt_type,

            target_delivery_date: line.target_delivery_date,

            note_to_vendor: line.note_to_vendor,
        }));
    }
}
