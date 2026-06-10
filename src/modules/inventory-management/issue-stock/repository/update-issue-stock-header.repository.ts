import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import e from "express";

@Injectable()
export class UpdateIssueStockHeaderRepository { 
    async update(
        tx: Prisma.TransactionClient,
        issue_stock_id: number,
        data: Prisma.issue_stock_headerUpdateInput
    ) {
        return tx.issue_stock_header.update({
            where: { issue_stock_id },
            data,
        });
    }

}
