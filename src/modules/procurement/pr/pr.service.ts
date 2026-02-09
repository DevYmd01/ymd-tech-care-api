import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'
import { PRHeaderRepository } from './repositories/pr-header.repository';
import { DocumentNumberService } from 'src/modules/document-number/document-number.service';
@Injectable()
export class PrService {
    constructor(
        private prisma: PrismaService,
        private prHeaderRepo: PRHeaderRepository,
        private documentNumberService: DocumentNumberService,
    ) { }

    async create(dto: CreatePRHeaderDTO) {
        return this.prisma.$transaction(async (tx) => {
            const docNo = await this.documentNumberService.generate({
                module_code: 'PR',
                document_type_code: 'PR',
                branch_id: dto.branch_id,
            });

            const header = await this.prHeaderRepo.create(tx, dto, docNo);


            return header;
        });
    }

}
