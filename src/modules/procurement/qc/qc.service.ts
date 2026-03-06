import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QcService {

    constructor(private prisma: PrismaService) { }

    async findPRWithoutQC(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const prs = await this.prisma.pr_header.findMany({
            where: {
                status: 'APPROVED',
                rfqHeaders: {
                    some: {
                        qcHeaders: {
                            none: {},
                        },
                    },
                },
            },
            include: {
                rfqHeaders: {
                    include: {
                        qcHeaders: true,
                    },
                },
            },
            skip,
            take,
        });

        const total = await this.prisma.pr_header.count({
            where: {
                status: 'APPROVED',
                rfqHeaders: {
                    some: {
                        qcHeaders: {
                            none: {},
                        },
                    },
                },
            },
        });

        return { data: prs, total, page, pageSize };
    }

    async findRFQWithoutQC(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const rfqs = await this.prisma.rfq_header.findMany({
            where: {
                qcHeaders: {
                    none: {},
                },
                pr: {
                    status: 'APPROVED',
                },
            },
            include: {
                qcHeaders: true,
                pr: true,
            },
            skip,
            take,
        });

        const total = await this.prisma.rfq_header.count({
            where: {
                qcHeaders: {
                    none: {},
                },
                pr: {
                    status: 'APPROVED',
                },
            },
        });

        return { data: rfqs, total, page, pageSize };
    }

}
