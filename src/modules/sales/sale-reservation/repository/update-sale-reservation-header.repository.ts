import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdateSaleReservationHeaderRepository {
    async update(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_reservation_headerUpdateInput,
        id: number
    ) {
        return tx.sale_reservation_header.update({
            data,
            where: { reservation_id: id },
        });
    }
    
}