import { CreateVQLineDTO } from "../dto/create-vq-line.dto";
import { Prisma } from "@prisma/client";

export class VQLineMapper {
    static toPrismaCreateInput(
        dto: CreateVQLineDTO,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        },
        vq_header_id: number,
    ): Prisma.vq_lineCreateInput {
        return {
            vq: { connect: { vq_header_id: vq_header_id } },
            line_no: dto.line_no,
            item: { connect: { item_id: dto.item_id } },
            prLine: { connect: { pr_line_id: dto.pr_line_id } },
            approval_line: { connect: { approval_line_id: dto.approval_line_id } },
            status: dto.status,
            qty: dto.qty,
            uom: { connect: { uom_id: dto.uom_id } },
            unit_price: dto.unit_price,
            discount_amount: calc.discountAmount,
            discount_expression: dto.discount_expression,
            net_amount: calc.netAmount,
        }
    }
}