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

    async findByCode(code: string) {
        return this.prisma.$transaction(async (tx) => {
        
        const system_document = await tx.system_document.findUnique({
            where: { system_document_code: code },
        });

        const docLinkIcs = await tx.doc_link_ic.findMany({
            where: { system_document_id: system_document?.system_document_id },
        });

        return { ...system_document, docLinkIcs };
    });
    }
}
