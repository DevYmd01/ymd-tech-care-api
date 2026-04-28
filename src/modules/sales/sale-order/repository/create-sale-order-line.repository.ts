import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleOrderLineRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_order_lineCreateManyInput[]
    ) {
        return tx.sale_order_line.createMany({
            data,
        });
    }

    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_order_lineCreateInput
    ) {
        return tx.sale_order_line.create({
            data,
        });
    }

}