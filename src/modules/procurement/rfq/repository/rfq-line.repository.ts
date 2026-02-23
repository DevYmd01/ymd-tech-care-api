import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateRFQLineRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_lineCreateManyInput[]
    ) {
        return tx.rfq_line.createMany({ data });
    }

    async updateMany(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_lineUncheckedUpdateInput[]
    ) {
        const updates = data.map(line =>
            tx.rfq_line.update({
                where: {
                    rfq_line_id: line.rfq_line_id as number
                },
                data: line
            })
        );

        return Promise.all(updates);
    }

    async deleteMany(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_lineWhereUniqueInput[]
    ) {
        const updates = data.map(line =>
            tx.rfq_line.delete({
                where: {
                    rfq_line_id: line.rfq_line_id
                },
            })
        );

        return Promise.all(updates);
    }

}