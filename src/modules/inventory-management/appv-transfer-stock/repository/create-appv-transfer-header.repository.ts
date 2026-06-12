import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateAppvTransferHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.appv_transfer_headerCreateInput
    ) {
        return tx.appv_transfer_header.create({
            data,
        });
    }

}