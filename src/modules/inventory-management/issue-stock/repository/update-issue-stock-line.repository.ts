import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateIssueStockLineRepository {   
    async update(
        tx: Prisma.TransactionClient,
        issue_stock_line_id: number,
        data: Prisma.issue_stock_lineUpdateInput
    ) {
        return tx.issue_stock_line.update({
            where: { issue_stock_line_id },
            data,
        });
    }

    async delete(
        tx: Prisma.TransactionClient,
        issue_stock_line_id: number
    ) {
        return tx.issue_stock_line.delete({
            where: { issue_stock_line_id },
        });
    }

}
