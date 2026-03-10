import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateVQHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.vq_headerCreateInput
    ) {
        return tx.vq_header.create({
            data,
        });
    }
}