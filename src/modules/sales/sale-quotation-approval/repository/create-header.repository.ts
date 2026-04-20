import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_approval_headerCreateInput
    ) {
        return tx.sale_quotation_approval_header.create({
            data,
        });
    }
}