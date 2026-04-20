import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateLineRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_approval_lineCreateInput
    ) {
        return tx.sale_quotation_approval_line.create({
            data,
        });
    }
}