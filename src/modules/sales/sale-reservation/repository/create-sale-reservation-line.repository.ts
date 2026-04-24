import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateSaleReservationLineRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_reservation_lineCreateManyInput[]
    ) {
        return tx.sale_reservation_line.createMany({
            data,
        });
    }

    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.sale_reservation_lineCreateInput
    ) {
        return tx.sale_reservation_line.create({
            data,
        });
    }

}