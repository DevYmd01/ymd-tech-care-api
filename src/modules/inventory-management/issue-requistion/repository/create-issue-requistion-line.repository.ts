import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateIssueRequistionLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.issue_requistion_lineCreateInput
    ) {
        return tx.issue_requistion_line.create({
            data,
        });
    }
    
}