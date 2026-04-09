import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class MultiPriceItemRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.multi_price_itemCreateInput
    ) {
        return tx.multi_price_item.create({
            data,
        });
    }

    async update(
        tx: Prisma.TransactionClient,
        where: Prisma.multi_price_itemWhereUniqueInput,
        data: Prisma.multi_price_itemUpdateInput
    ) {
        return tx.multi_price_item.update({
            where,
            data,
        });
    }
}