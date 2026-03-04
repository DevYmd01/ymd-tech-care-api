import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateVQHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        id: number,
        data: Prisma.vq_headerUpdateInput
    ) {
        return tx.vq_header.update({
            where: { vq_header_id: id },
            data,
        });
    }
}