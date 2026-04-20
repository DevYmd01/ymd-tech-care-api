import { Prisma } from "@prisma/client";
import { CreateLineDto } from "../dto/create-line.dto";

export class CreateLineMapper {
    static toPrismaCreateInput(
        data: CreateLineDto,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        },
        aq_id: number,
    ): Prisma.sale_quotation_approval_lineCreateInput {
        return {
            aq_header: { connect: { aq_id: aq_id } },
            sq_line: { connect: { sq_line_id: data.sq_line_id } },
            approved_qty: data.approved_qty,
            qty: data.qty,
            uom: { connect: { uom_id: data.uom_id } },
            unit_price: data.unit_price,
            discount_expression: data.discount_expression,
            discount_amount: calc.discountAmount,
            net_amount: calc.netAmount,
            remarks: data.remarks,

        }
    }
}