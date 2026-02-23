import { Prisma } from "@prisma/client";
import { UpdateRFQLineDTO } from "../dto/update-rfq-line.dto";

export class UpdateRFQLineMapper {
    static toPrismaUpdateInput(
        lines: UpdateRFQLineDTO[],
        rfq_id: number,
    ): Prisma.rfq_lineUncheckedUpdateInput[] {

        return lines.map(line => ({
            rfq_id: rfq_id,

            line_no: line.line_no,
            pr_line_id: line.pr_line_id,

            item_id: line.item_id ?? null,
            description: line.description ?? null,

            qty: line.qty,
            uom_id: line.uom_id,

            required_receipt_type: line.required_receipt_type ?? null,
            target_delivery_date: line.target_delivery_date ?? null,
            note_to_vendor: line.note_to_vendor ?? null,
        }));
    }
}
