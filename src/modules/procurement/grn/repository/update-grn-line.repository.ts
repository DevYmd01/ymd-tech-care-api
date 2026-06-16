import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateGrnLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        grn_line_id: number,
        data: Prisma.grn_lineUpdateInput
    ) {
        return tx.grn_line.update({
            where: { grn_line_id: grn_line_id },
            data,
        });
    }

}