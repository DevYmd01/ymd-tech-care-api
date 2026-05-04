import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleOrderApprovalLineRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_order_approval_lineCreateManyInput[]
    ) {
        return tx.sale_order_approval_line.createMany({
            data,
        });
    }

    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_order_approval_lineCreateInput
    ) {
        return tx.sale_order_approval_line.create({
            data,
        });
    }

}