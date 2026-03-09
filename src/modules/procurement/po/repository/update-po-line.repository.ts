import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdatePOLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        id: number,
        data: Prisma.po_lineUpdateInput
    ) {
        return tx.po_line.update({
            where: { po_line_id: id },
            data,
        });
    }
}