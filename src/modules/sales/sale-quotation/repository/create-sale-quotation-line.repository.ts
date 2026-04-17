import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleQuotationLineRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_lineCreateManyInput[]
    ) {
        return tx.sale_quotation_line.createMany({
            data,
        });
    }

    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_lineCreateInput
    ) {
        return tx.sale_quotation_line.create({
            data,
        });
    }

}