import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateGrnHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        grn_id: number,
        data: Prisma.grn_headerUpdateInput
    ) {
        return tx.grn_header.update({
            where: { grn_id: grn_id },
            data,
        });
    }

}