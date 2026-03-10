import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateRFQHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_headerCreateInput
    ) {
        return tx.rfq_header.create({
            data,
        });
    }

    async update(
        tx: Prisma.TransactionClient,
        rfq_id: number,
        data: Prisma.rfq_headerUncheckedUpdateInput
    ) {
        return tx.rfq_header.update({
            where: { rfq_id },
            data,
        });
    }
}
