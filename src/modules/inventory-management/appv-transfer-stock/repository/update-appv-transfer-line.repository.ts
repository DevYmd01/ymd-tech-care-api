
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateAppvTransferLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        appv_transfer_line_id: number,
        data: Prisma.appv_transfer_lineUpdateInput
    ) {
        return tx.appv_transfer_line.update({
            where: { appv_transfer_line_id },
            data,
        });
    }

    async delete(
        tx: Prisma.TransactionClient,
        appv_transfer_line_id: number
    ) {
        return tx.appv_transfer_line.delete({
            where: { appv_transfer_line_id },
        });
    }
}