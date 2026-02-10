import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePRHeaderDTO } from './dto/creacte-pr-header.dto'
import { PRHeaderRepository } from './repositories/create-pr-header.repository';
import { DocumentNumberService } from 'src/modules/document-number/document-number.service';
import { CreatePRLineRepository } from './repositories/create-pr-line.repository';
import { CreateAuditLogRepository } from './repositories/create-audit-log.repository';
import { CreatePRLineDTO } from './dto/create-pr-line.dto';
import { Prisma } from '@prisma/client';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PrService {
    constructor(
        private prisma: PrismaService,
        private prHeaderRepo: PRHeaderRepository,
        private documentNumberService: DocumentNumberService,
        private prLineRepo: CreatePRLineRepository,
        private createAuditLogRepo: CreateAuditLogRepository,
    ) { }

    async create(dto: CreatePRHeaderDTO, context: any) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const docNo = await this.documentNumberService.generate({
                    module_code: 'PR',
                    document_type_code: 'PR',
                    branch_id: dto.branch_id,
                });

                const header = await this.prHeaderRepo.create(tx, dto, docNo);

                for (const line of dto.lines) {
                    await this.prLineRepo.create(tx, line, header.pr_id);
                }

                await this.createAuditLogRepo.create(tx, header, context);

                return header;
            });
        } catch (error) {
            // Prisma Known Errors
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {

                    case 'P2003':
                        throw new BadRequestException(
                            `Foreign key constraint failed: ${error.meta?.constraint}`,
                        );

                    case 'P2002':
                        throw new BadRequestException(
                            `Duplicate unique value: ${error.meta?.target}`,
                        );

                    default:
                        throw new InternalServerErrorException(
                            `Database error: ${error.code}`,
                        );
                }
            }

            // Validation / Business logic errors
            if (error instanceof BadRequestException) {
                throw error;
            }

            // Fallback
            throw new InternalServerErrorException(
                'Unexpected server error during PR creation',
            );

        }
    }

    async findAll() {
        return this.prisma.pr_header.findMany();
    }

}
