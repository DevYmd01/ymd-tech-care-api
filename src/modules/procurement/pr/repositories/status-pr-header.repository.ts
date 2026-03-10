import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StatusPRHeaderRepository {
    constructor(private readonly prisma: PrismaService) { }

    async updateStatus(pr_id: number, status: string) {
        return this.prisma.pr_header.update({
            where: { pr_id },
            data: { status },
        });
    }

    async findById(pr_id: number) {
        return this.prisma.pr_header.findUnique({
            where: { pr_id },
        });
    }
}
