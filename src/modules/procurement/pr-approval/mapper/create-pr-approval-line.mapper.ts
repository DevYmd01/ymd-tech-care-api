import { createPrApprovalLineDto } from "../dto/create-pr-approval-line.dto";
import { Prisma } from "@prisma/client";

export class PRApprovalLineMapper {
    static toPrismaCreateInput(
        dto: createPrApprovalLineDto,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        },
        approval_id: number,
    ): Prisma.pr_approval_lineCreateInput {
        return {
            approved_qty: dto.approved_qty,
            remarks: dto.remarks,
            pr_line: { connect: { pr_line_id: dto.pr_line_id } },
            approval: { connect: { approval_id: approval_id } },
            approved_at: new Date(),
        }
    }
}