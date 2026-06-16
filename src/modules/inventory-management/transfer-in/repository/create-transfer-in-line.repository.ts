import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateTransferInLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.transfer_in_lineCreateInput
    ) {
        return tx.transfer_in_line.create({
            data,
        });
    }

}