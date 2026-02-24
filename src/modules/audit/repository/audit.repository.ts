import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { Prisma } from "@prisma/client";


@Injectable()
export class AuditRepository {

    constructor(private prisma: PrismaService) { }

    async createLogs(data: Prisma.audit_logCreateManyInput[]) {

        return this.prisma.audit_log.createMany({
            data
        });

    }

}
