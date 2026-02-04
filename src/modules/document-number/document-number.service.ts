import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateDocNumberDto } from './dto/generate-doc-number.dto';

@Injectable()
export class DocumentNumberService {
    constructor(private readonly prisma: PrismaService) { }

    async generate(dto: GenerateDocNumberDto): Promise<string> {
        const date = dto.date ? new Date(dto.date) : new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const format = await this.prisma.document_format.findFirst({
            where: {
                module_code: dto.module_code,
                document_type_code: dto.document_type_code,
            },
        });

        if (!format) {
            throw new BadRequestException('Document format not found');
        }

        const runningKey = {
            document_format_id: format.document_format_id,
            branch_id: dto.branchId ?? 0,
            prefix: dto.prefix ?? format.prefix ?? '-',
            year: format.use_year ? year : 0,
            month: format.use_month ? month : 0,
            day: format.use_day ? day : 0,
        };

        const seq = await this.getNextSequence(runningKey);

        return this.formatDocumentNumber(format, runningKey, seq);
    }

    private async getNextSequence(key: {
        document_format_id: number;
        branch_id: number;
        prefix: string;
        year: number;
        month: number;
        day: number;
    }): Promise<number> {
        return this.prisma.$transaction(async (tx) => {
            const running = await tx.document_running.findUnique({
                where: {
                    document_format_id_branch_id_prefix_year_month_day: key,
                },
            });

            if (!running) {
                const created = await tx.document_running.create({
                    data: {
                        ...key,
                        last_seq: 1,
                    },
                });

                return created.last_seq;
            }

            const updated = await tx.document_running.update({
                where: { id: running.id },
                data: { last_seq: { increment: 1 } },
            });

            return updated.last_seq;
        });
    }

    private formatDocumentNumber(
        format: any,
        key: {
            prefix: string;
            year: number;
            month: number;
            day: number;
        },
        seq: number,
    ): string {
        const parts: string[] = [];

        if (key.prefix !== '-') parts.push(key.prefix);
        if (key.year) parts.push(key.year.toString());
        if (key.month) parts.push(key.month.toString().padStart(2, '0'));
        if (key.day) parts.push(key.day.toString().padStart(2, '0'));

        parts.push(seq.toString().padStart(format.seq_length, '0'));

        return parts.join('-');
    }
}
