import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateAppvTransferLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.appv_transfer_lineCreateInput
    ) {
        return tx.appv_transfer_line.create({
            data,
        });
    }

}