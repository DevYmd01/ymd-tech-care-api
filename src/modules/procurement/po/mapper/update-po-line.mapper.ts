import { UpdatePOLineDTO } from "../dto/update-po-line.dto";
import { Prisma } from "@prisma/client";

export class UpdatePOLineMapper {
    static toPrismaUpdateInput(
        dto: UpdatePOLineDTO,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        },
        po_header_id: number,
    ): Prisma.po_lineUpdateInput {
        return {
            poHeader: { connect: { po_header_id: po_header_id } },
            line_no: dto.line_no,
            item: { connect: { item_id: dto.item_id } },

            ...(dto.pr_line_id !== undefined && {
                prLine: dto.pr_line_id === null ? { disconnect: true } : { connect: { pr_line_id: dto.pr_line_id } }
            }),

            ...(dto.rfq_line_id !== undefined && {
                rfqLine: dto.rfq_line_id === null ? { disconnect: true } : { connect: { rfq_line_id: dto.rfq_line_id } }
            }),

            status: dto.status,
            qty: dto.qty,
            uom: { connect: { uom_id: dto.uom_id } },
            unit_price: dto.unit_price,
            discount_amount: calc.discountAmount,
            discount_expression: dto.discount_expression,
            net_amount: calc.netAmount,
            required_receipt_type: dto.required_receipt_type,
            description: dto.description
        }
    }
}