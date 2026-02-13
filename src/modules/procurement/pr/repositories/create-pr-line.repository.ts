import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePRLineDTO } from "../dto/create-pr-line.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePRLineRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(
        tx: Prisma.TransactionClient,
        lineData: Prisma.pr_lineCreateInput,
    ) {
        return tx.pr_line.create({
            data: lineData,

        });
    }
}
