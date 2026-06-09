import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateIssueRequistionHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        issue_req_id: number,
        data: Prisma.issue_requistion_headerUpdateInput
    ) {
        return tx.issue_requistion_header.update({
            where: { issue_req_id },
            data,
        });
    }
    
}