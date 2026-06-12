import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateAppvTransferHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        appv_transfer_id: number,
        data: Prisma.appv_transfer_headerUpdateInput
    ) {
        return tx.appv_transfer_header.update({
            where: { appv_transfer_id },
            data,
        });
    }

}