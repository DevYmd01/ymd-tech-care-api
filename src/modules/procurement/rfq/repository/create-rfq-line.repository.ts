import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateRFQLineRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_lineCreateManyInput[]
    ) {
        return tx.rfq_line.createMany({ data });
    }
}