import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateTransferReqLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        transfer_req_line_id: number,
        data: Prisma.transfer_requisition_lineUpdateInput
    ) {
        return tx.transfer_requisition_line.update({
            where: { transfer_req_line_id },
            data,
        });
    }

}