import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateSaleQuotationLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_quotation_lineUpdateInput,
        id: number
    ) {
        return tx.sale_quotation_line.update({
            data,
            where: { sq_line_id: id },
        });
    }
    
}