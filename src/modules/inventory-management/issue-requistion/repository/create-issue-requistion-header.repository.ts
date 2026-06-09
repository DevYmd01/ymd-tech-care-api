import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateIssueRequistionHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.issue_requistion_headerCreateInput
    ) {
        return tx.issue_requistion_header.create({
            data,
        });
    }
    
}