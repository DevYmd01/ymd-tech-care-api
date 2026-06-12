import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateTransferReqHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.transfer_requisition_headerCreateInput
    ) {
        return tx.transfer_requisition_header.create({
            data,
        });
    }

}