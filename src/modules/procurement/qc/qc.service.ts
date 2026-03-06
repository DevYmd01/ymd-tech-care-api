import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQcHeaderDTO } from './dto/create-qc-header.dto';
import { CreateQcHeaderRepository } from './repository/create-qc-header.repository';
import { QCHeaderMapper } from './mapper/create-qc-header.mapper';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';

@Injectable()
export class QcService {

    constructor(
        private prisma: PrismaService,
        private createQcHeaderRepository: CreateQcHeaderRepository,
        private documentNumberService: DocumentNumberService,
    ) { }

    // แสดง PR ที่ยังไม่มี QC
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

        // นับจำนวน PR ที่มี RFQ แล้วแต่ยังไม่มี QC
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

        // นับจำนวน RFQ ที่มี PR แล้วแต่ยังไม่มี QC
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

    async findVendorWithoutQCByRFQId(rfq_id: number) {
        return this.prisma.vq_header.findMany({
            where: {
                rfq_id,
                status: 'RECORDED',
            },
            include: {
                vendor: {
                    select: {
                        vendor_id: true,
                        vendor_name: true,
                        vendor_code: true
                    }
                },
                vqLines: true,
            },
            orderBy: {
                base_total_amount: 'asc',
            },
        });
    }

    // สร้าง QC
    async create(createQcDto: CreateQcHeaderDTO, user: any) {
        return this.prisma.$transaction(async (tx) => {

            const qc_no = await this.documentNumberService.generate({
                module_code: 'QC',
                document_type_code: 'QC',
                branch_id: 0,
            });

            const data = QCHeaderMapper.toPrismaCreateInput(createQcDto, qc_no);
            return this.createQcHeaderRepository.create(tx, data);
        })
    }

}
