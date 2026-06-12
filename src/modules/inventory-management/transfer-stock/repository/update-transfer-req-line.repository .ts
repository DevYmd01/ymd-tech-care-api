import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateTransferReqLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.transfer_requisition_lineCreateInput
    ) {
        return tx.transfer_requisition_line.create({
            data,
        });
    }

}