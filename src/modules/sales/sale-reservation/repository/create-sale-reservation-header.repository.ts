import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleReservationHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_reservation_headerCreateInput
    ) {
        return tx.sale_reservation_header.create({
            data,
        });
    }
    
}