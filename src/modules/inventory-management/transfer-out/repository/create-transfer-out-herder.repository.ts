import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateTransferOutHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.transfer_out_headerCreateInput
    ) {
        return tx.transfer_out_header.create({
            data,
        });
    }

}