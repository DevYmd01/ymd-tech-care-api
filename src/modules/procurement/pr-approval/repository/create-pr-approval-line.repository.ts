import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePRApprovalLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.pr_approval_lineCreateInput
    ) {
        return tx.pr_approval_line.create({
            data,
        });
    }
}