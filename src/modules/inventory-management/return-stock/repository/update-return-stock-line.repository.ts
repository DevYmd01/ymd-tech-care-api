import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateReturnStockLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        return_stock_line_id: number,
        data: Prisma.return_issue_stock_lineUpdateInput
    ) {
        return tx.return_issue_stock_line.update({
            where: { return_stock_line_id },
            data,
        });
    
    }

    async delete(
        tx: Prisma.TransactionClient,
        return_stock_line_id: number
    ) {
        return tx.return_issue_stock_line.delete({
            where: { return_stock_line_id },
        });
    }

}