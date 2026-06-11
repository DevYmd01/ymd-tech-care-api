import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateReturnStockHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        return_stock_id: number,
        data: Prisma.return_issue_stock_headerUpdateInput
    ) {
        return tx.return_issue_stock_header.update({
            where: { return_stock_id: return_stock_id },
            data,
        });
    
    }

}