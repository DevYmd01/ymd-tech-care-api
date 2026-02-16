import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePRLineRepository {

    async create(
        tx: Prisma.TransactionClient,
        lineData: Prisma.pr_lineCreateInput,
    ) {
        return tx.pr_line.create({
            data: lineData,

        });
    }
}
