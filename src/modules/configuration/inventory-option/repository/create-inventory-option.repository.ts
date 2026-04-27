import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateInventoryOptionRepository {
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.ic_optionCreateInput
    ) {
        return tx.ic_option.create({
            data,
        });
    }
}