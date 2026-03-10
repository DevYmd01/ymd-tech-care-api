import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePOLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.po_lineCreateInput
    ) {
        return tx.po_line.create({
            data,
        });
    }
}