import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleOrderApprovalHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_order_approval_headerCreateInput
    ) {
        return tx.sale_order_approval_header.create({
            data,
        });
    }
    
}