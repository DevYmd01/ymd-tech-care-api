import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateTransferInHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.transfer_in_headerCreateInput
    ) {
        return tx.transfer_in_header.create({
            data,
        });
    }

}