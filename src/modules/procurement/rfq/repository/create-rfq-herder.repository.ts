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
}
