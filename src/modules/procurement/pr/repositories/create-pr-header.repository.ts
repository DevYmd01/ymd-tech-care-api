import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PRHeaderRepository {

    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.pr_headerCreateInput
    ) {
        return tx.pr_header.create({
            data,
        });
    }
}

