import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateSaleQuotationHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_headerUpdateInput,
        id: number
    ) {
        return tx.sale_quotation_header.update({
            data,
            where: { sq_id: id },
        });
    }
    
}