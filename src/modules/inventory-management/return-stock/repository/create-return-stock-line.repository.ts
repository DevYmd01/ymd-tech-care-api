import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateReturnStockLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.return_issue_stock_lineCreateInput
    ) {
        return tx.return_issue_stock_line.create({
            data,
        });
    }

}