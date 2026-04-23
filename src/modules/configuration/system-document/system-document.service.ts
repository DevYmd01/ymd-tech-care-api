import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SystemDocumentService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return await this.prisma.system_document.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.system_document.findUnique({
            where: { system_document_id: id },
        });
    }
}
