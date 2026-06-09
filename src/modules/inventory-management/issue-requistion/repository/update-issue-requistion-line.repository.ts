import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateIssueRequistionLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        issue_req_line_id: number,
        data: Prisma.issue_requistion_lineUpdateInput
    ) {
        return tx.issue_requistion_line.update({
            where: { issue_req_line_id },
            data,
        });
    }
    
}