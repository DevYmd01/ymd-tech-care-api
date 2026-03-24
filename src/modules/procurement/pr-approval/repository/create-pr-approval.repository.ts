import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePRApprovalHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.pr_approvalCreateInput
    ) {
        return tx.pr_approval.create({
            data,
        });
    }
}