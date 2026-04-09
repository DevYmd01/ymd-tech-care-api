import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePriceListHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.price_list_headerCreateInput
    ) {
        return tx.price_list_header.create({
            data,
        });
    }   
}