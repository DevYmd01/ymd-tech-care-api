import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateVQLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        vq_line_id: number,
        data: Prisma.vq_lineUpdateInput
    ) {
        return tx.vq_line.update({
            where: { vq_line_id },
            data,
        });
    }
}