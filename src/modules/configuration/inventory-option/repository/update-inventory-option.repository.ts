import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateInventoryOptionRepository {
    async update(
        tx: Prisma.TransactionClient,
        id: number,
        data: Prisma.ic_optionUpdateInput
    ) {
        return tx.ic_option.update({
            where: { ic_option_id: id },
            data,
        });
    }
}