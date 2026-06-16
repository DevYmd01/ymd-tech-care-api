import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateGrnHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.grn_headerCreateInput
    ) {
        return tx.grn_header.create({
            data,
        });
    }

}