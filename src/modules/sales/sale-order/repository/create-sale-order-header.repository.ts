import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleOrderHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_order_headerCreateInput
    ) {
        return tx.sale_order_header.create({
            data,
        });
    }
    
}