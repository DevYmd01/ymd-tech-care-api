import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateReturnStockHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.return_issue_stock_headerCreateInput
    ) {
        return tx.return_issue_stock_header.create({
            data,
        });
    }

}