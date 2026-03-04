import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateVQLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.vq_lineCreateInput
    ) {
        return tx.vq_line.create({
            data,
        });
    }
}