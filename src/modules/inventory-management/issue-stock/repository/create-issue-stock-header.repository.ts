import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateIssueStockHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.issue_stock_headerCreateInput
    ) {
        return tx.issue_stock_header.create({
            data,
        });
    }

}