import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePOApprovalLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.po_approval_lineCreateInput
    ) {
        return tx.po_approval_line.create({
            data,
        });
    }
}