import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
@Injectable()
export class CreatePriceListLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.price_list_item_lineCreateInput
    ) {
        return tx.price_list_item_line.create({
            data,
        });
    }

    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.price_list_item_lineCreateManyInput[]
    ) {
        return tx.price_list_item_line.createMany({
            data,
        });
    }
}