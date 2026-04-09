import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdatePriceListHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        price_list_header_id: number,
        data: Prisma.price_list_headerUpdateInput
    ) {
        return tx.price_list_header.update({
            where: {
                price_list_header_id,
            },
            data,
        });
    }
}