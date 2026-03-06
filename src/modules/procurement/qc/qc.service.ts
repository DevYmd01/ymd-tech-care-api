import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQcHeaderDTO } from './dto/create-qc-header.dto';
import { CreateQcHeaderRepository } from './repository/create-qc-header.repository';
import { QCHeaderMapper } from './mapper/create-qc-header.mapper';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { AuditLogRepository } from './repository/audit-log.repository';
import { UpdateQcHeaderDTO } from './dto/update-qc-header.dto';
import { UpdateQcHeaderMapper } from './mapper/update-qc-header.mapper';

@Injectable()
export class QcService {

    constructor(
        private prisma: PrismaService,
        private createQcHeaderRepository: CreateQcHeaderRepository,
        private documentNumberService: DocumentNumberService,
        private auditLogRepository: AuditLogRepository,
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
            const header = await this.createQcHeaderRepository.create(tx, data);

            await this.auditLogRepository.create(tx, header, user);

            return header;
        })
    }

    // อัปเดต QC
    async update(qc_header_id: number, updateQcDto: UpdateQcHeaderDTO, user: any) {
        return this.prisma.$transaction(async (tx) => {
            const data = UpdateQcHeaderMapper.toPrismaUpdateInput(updateQcDto);

            const existing = await tx.qc_header.findUnique({
                where: { qc_id: qc_header_id }
            });

            if (!existing) {
                throw new Error("QC Header not found")
            }
            const header = await this.createQcHeaderRepository.update(tx, data, existing);

            await this.auditLogRepository.update(tx, header, user);

            return header;
        })
    }

    // แสดง QC ทั้งหมด
    async findAll(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const qcHeaders = await this.prisma.qc_header.findMany({
            include: {
                pr: {
                    select: {
                        pr_no: true
                    }
                },
                rfq: {
                    select: {
                        rfq_no: true
                    }
                },
                winningVq: {
                    select: {
                        vq_no: true,
                        vendor: {
                            select: {
                                vendor_name: true
                            }
                        }
                    }
                },

            },
            skip,
            take,
        });

        const data = qcHeaders.map((qc) => {
            return {
                qc_id: qc.qc_id,
                qc_no: qc.qc_no,
                pr_no: qc.pr?.pr_no,
                rfq_no: qc.rfq?.rfq_no,
                vq_no: qc.winningVq?.vq_no,
                vendor_name: qc.winningVq?.vendor?.vendor_name,
                status: qc.status,
                created_at: qc.created_at
            }
        })
        const total = await this.prisma.qc_header.count();

        return { data, total, page, pageSize };
    }

}
