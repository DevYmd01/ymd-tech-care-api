import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateTransferOutLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.transfer_out_lineCreateInput
    ) {
        return tx.transfer_out_line.create({
            data,
        });
    }

}