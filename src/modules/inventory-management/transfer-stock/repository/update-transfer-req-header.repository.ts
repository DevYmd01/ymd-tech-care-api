import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateTransferReqHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        transfer_req_id: number,
        data: Prisma.transfer_requisition_headerUpdateInput
    ) {
        return tx.transfer_requisition_header.update({
            where: { transfer_req_id },
            data,
        });
    }

}