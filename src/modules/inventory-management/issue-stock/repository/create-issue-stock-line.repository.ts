import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateIssueStockLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.issue_stock_lineCreateInput
    ) {
        return tx.issue_stock_line.create({
            data,
        });
    }

}