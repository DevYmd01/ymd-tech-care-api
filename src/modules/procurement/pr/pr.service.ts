import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'
import { PRHeaderRepository } from './repositories/create-pr-header.repository';
import { DocumentNumberService } from 'src/modules/document-number/document-number.service';
import { CreatePRLineDTO } from './dto/create-pr-line.dto';
import { CreatePRLineRepository } from './repositories/create-pr-line.repository';

@Injectable()
export class PrService {
    constructor(
        private prisma: PrismaService,
        private prHeaderRepo: PRHeaderRepository,
        private documentNumberService: DocumentNumberService,
        private prLineRepo: CreatePRLineRepository,
    ) { }

    async create(dto: CreatePRHeaderDTO) {
        return this.prisma.$transaction(async (tx) => {
            const docNo = await this.documentNumberService.generate({
                module_code: 'PR',
                document_type_code: 'PR',
                branch_id: dto.branch_id,
            });

            const header = await this.prHeaderRepo.create(tx, dto, docNo);

            for (const line of dto.lines) {
                await this.prLineRepo.create(tx, line, header.pr_id);
            }

            return header;
        });
    }

    async findAll() {
        return this.prisma.pr_header.findMany();
    }

}
