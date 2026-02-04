import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateDocNumberDto } from './dto/generate-doc-number.dto';

@Injectable()
export class DocumentNumberService {
    constructor(private readonly prisma: PrismaService) { }

    async generate(params: GenerateDocNumberDto): Promise<string> {
        const date = params.date ?? new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const format = await this.prisma.document_format.findFirst({
            where: {
                module_code: params.module_code,
                document_type_code: params.document_type_code,
            },
        });

        if (!format) {
            throw new BadRequestException('Document format not found');
        }

        const tokens = this.extractTokens(format.pattern);
        this.validateTokens(tokens);

        // 🔒 Validate branch if needed
        if (tokens.includes('BR') && !params.branch_id) {
            throw new BadRequestException('branch_id is required for this document format');
        }

        const branch = tokens.includes('BR') && params.branch_id
            ? await this.prisma.org_branch.findUnique({
                where: { branch_id: params.branch_id },
                select: { branch_code: true },
            })
            : null;

        const branchCode = branch?.branch_code ?? '';
        console.log('branchCode', branchCode);
        const runningKey = {
            document_format_id: format.document_format_id,
            branch_id: tokens.includes('BR') ? params.branch_id ?? 0 : 0,
            prefix: format.prefix ?? '',
            year: tokens.includes('YYYY') ? year : 0,
            month: tokens.includes('MM') ? month : 0,
            day: tokens.includes('DD') ? day : 0,
        };

        const seq = await this.getNextSequence(runningKey);

        return this.buildDocumentNumber(
            format.pattern,
            runningKey,
            seq,
            format.seq_length,
            branchCode,
        );
    }

    private extractTokens(pattern: string): string[] {
        return Array.from(pattern.matchAll(/\{(\w+)\}/g)).map((m) => m[1]);
    }

    private validateTokens(tokens: string[]) {
        const allowed = ['PREFIX', 'BR', 'YYYY', 'MM', 'DD', 'RUN'];

        tokens.forEach((t) => {
            if (!allowed.includes(t)) {
                throw new BadRequestException(`Invalid token {${t}} in document pattern`);
            }
        });
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
            console.log(running);
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


    private buildDocumentNumber(
        pattern: string,
        key: {
            prefix: string;
            branch_id: number;
            year: number;
            month: number;
            day: number;
        },
        seq: number,
        seqLength: number,
        branchCode: string,
    ): string {
        return pattern
            .replace('{PREFIX}', key.prefix)
            .replace('{BR}', branchCode)
            .replace('{YYYY}', key.year ? key.year.toString() : '')
            .replace('{MM}', key.month ? key.month.toString().padStart(2, '0') : '')
            .replace('{DD}', key.day ? key.day.toString().padStart(2, '0') : '')
            .replace('{RUN}', seq.toString().padStart(seqLength, '0'))
            .replace(/--+/g, '-')
            .replace(/\/+/g, '/')
            .replace(/^-|-$|\/$/g, '');
    }
}
