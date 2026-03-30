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

    const whereCondition = {
        status: 'APPROVED',
        rfqHeaders: {
            some: {
                qcHeaders: {
                    none: {}, // ยังไม่มี QC ใน RFQ นี้
                },
            },
        },
    };

    const prs = await this.prisma.pr_header.findMany({
        where: whereCondition,
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
        where: whereCondition,
    });

    return { data: prs, total, page, pageSize };
}

async findRFQWithoutQC(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const whereCondition = {
        qcHeaders: {
            none: {}, // ยังไม่มี QC → แสดง
        },
        pr: {
            status: { in: ['APPROVED', 'PARTIAL'] },
        },
    };

    const rfqs = await this.prisma.rfq_header.findMany({
        where: whereCondition,
        include: {
            qcHeaders: true,
            pr: true,
            pr_approval: true,
            rfqVendors: {
                where: { is_active: true },
            },
            vqHeaders: {
                where: { status: 'RECORDED' },
            },
        },
        skip,
        take,
    });

    const rfqsData = rfqs.map((rfq) => ({
        pr_header_id: rfq.pr.pr_id,
        pr_no: rfq.pr.pr_no,
        pr_requester_name: rfq.pr.requester_name,
        pr_date: rfq.pr.pr_date,
        pr_status: rfq.pr.status,
        pr_remark: rfq.pr.remark,

        pr_approval_id: rfq.pr_approval_id,
        av_no: rfq.pr_approval?.approval_no,
        av_date: rfq.pr_approval?.approval_date,
        av_status: rfq.pr_approval?.status,
        av_remark: rfq.pr_approval?.remarks,

        rfq_id: rfq.rfq_id,
        rfq_no: rfq.rfq_no,
        rfq_date: rfq.rfq_date,
        rfq_status: rfq.status,
        rfq_remark: rfq.remarks,
        rfq_requester_name: rfq.requested_by,

        rfq_vendor_count: rfq.rfqVendors.length ?? 0,
        rfq_vendor_active_count: rfq.vqHeaders.length ?? 0,
    }));

    const total = await this.prisma.rfq_header.count({
        where: whereCondition, // สำคัญมาก ต้องเหมือนกัน
    });

    return { data: rfqsData, total, page, pageSize };
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

            // await this.auditLogRepository.create(tx, header, user);

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

            // await this.auditLogRepository.update(tx, header, user);

            return header;
        })
    }

    // แสดง QC ทั้งหมด
    async findAll(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const qcHeaders = await this.prisma.qc_header.findMany({
            include: {
                pr: {
                    select: {
                        pr_id: true,
                        pr_no: true
                    }
                },
                rfq: {
                    select: {
                        rfq_id: true,
                        rfq_no: true,
                        pr_approval: {
                            select: {
                                approval_id: true,
                                approval_no: true,
                                approval_date: true,
                                status: true,
                                remarks: true
                            },
                        },
                        _count: {
                            select: {
                                vqHeaders: true,
                            }
                        }
                        
                    }
                },
                winningVq: {
                    select: {
                        vq_header_id: true,
                        vq_no: true,
                        base_total_amount: true,
                        vendor: {
                            select: {
                                vendor_id: true,
                                vendor_name: true,
                            }
                        }
                    }
                }
            },
            skip,
            take: pageSize,
        });

        const data = qcHeaders.map((qc) => ({
            qc_id: qc.qc_id,
            qc_no: qc.qc_no,
            av_no: qc.rfq?.pr_approval?.approval_no,
            av_date: qc.rfq?.pr_approval?.approval_date,
            av_status: qc.rfq?.pr_approval?.status,
            av_remark: qc.rfq?.pr_approval?.remarks,
            pr_header_id: qc.pr_id,
            rfq_header_id: qc.rfq_id,
            vq_header_id: qc.winningVq?.vq_header_id,
            pr_no: qc.pr?.pr_no,
            rfq_no: qc.rfq?.rfq_no,
            vq_no: qc.winningVq?.vq_no,
            vq_total_amount: qc.winningVq?.base_total_amount,
            vendor_name: qc.winningVq?.vendor?.vendor_name,
            vendor_count: qc.rfq?._count?.vqHeaders ?? 0,
            status: qc.status,
            created_at: qc.created_at
        }));

        const total = await this.prisma.qc_header.count();

        return { data, total, page, pageSize };
    }

}
