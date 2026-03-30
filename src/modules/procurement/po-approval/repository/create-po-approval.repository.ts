import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePOApprovalHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.po_approvalCreateInput
    ) {
        return tx.po_approval.create({
            data,
        });
    }
}