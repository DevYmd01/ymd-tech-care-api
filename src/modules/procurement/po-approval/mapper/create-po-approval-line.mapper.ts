import { createPoApprovalLineDto } from "../dto/create-po-line-approval.to";
import { Prisma } from "@prisma/client";

export class PoApprovalLineMapper {
    static toPrismaCreateInput(
        dto: createPoApprovalLineDto,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        },
        approval_id: number,
        status: string = 'APPROVED'
    ): Prisma.po_approval_lineCreateInput {
        return {
            approved_qty: dto.approved_qty,
            remarks: dto.remarks,
            po_line: { connect: { po_line_id: dto.po_line_id } },
            approval: { connect: { approval_id: approval_id } },
            approved_at: new Date(),
            status: status,
        }
    }
}