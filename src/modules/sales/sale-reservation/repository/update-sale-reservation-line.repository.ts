import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateSaleReservationLineRepository {
    async update(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_reservation_lineUpdateInput,
        id: number
    ) {
        return tx.sale_reservation_line.update({
            data,
            where: { reservation_line_id: id },
        });
    }
    
}