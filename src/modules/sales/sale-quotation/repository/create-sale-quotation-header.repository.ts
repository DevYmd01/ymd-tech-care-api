import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CreateSaleQuotationHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_headerCreateInput
    ) {
        return tx.sale_quotation_header.create({
            data,
        });
    }
    
}