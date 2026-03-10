import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateQcHeaderRepository {
    constructor(private prisma: PrismaService) { }
    async create(
        tx: Prisma.TransactionClient,
        data: Prisma.qc_headerCreateInput
    ) {
        return tx.qc_header.create({
            data,
        });
    }

    async update(
        tx: Prisma.TransactionClient,
        data: Prisma.qc_headerUpdateInput,
        where: Prisma.qc_headerWhereUniqueInput
    ) {
        return tx.qc_header.update({
            data,
            where,
        });
    }
}