import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdatePriceListLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        price_list_item_id: number,
        data: Prisma.price_list_item_lineUpdateInput
    ) {
        return tx.price_list_item_line.update({
            where: {
                price_list_item_id,
            },
            data,
        });
    }
}