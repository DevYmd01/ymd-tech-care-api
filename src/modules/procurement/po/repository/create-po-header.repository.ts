import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePOHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.po_headerCreateInput
    ) {
        return tx.po_header.create({
            data,
        });
    }
}