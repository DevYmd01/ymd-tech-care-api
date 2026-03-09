import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdatePOHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        id: number,
        data: Prisma.po_headerUpdateInput
    ) {
        return tx.po_header.update({
            where: { po_header_id: id },
            data,
        });
    }
}