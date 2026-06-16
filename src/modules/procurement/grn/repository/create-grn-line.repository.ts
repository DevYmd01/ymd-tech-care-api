import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateGrnLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.grn_lineCreateInput
    ) {
        return tx.grn_line.create({
            data,
        });
    }

}