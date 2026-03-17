import { Injectable, Query, NotFoundException, BadRequestException} from '@nestjs/common';
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';
import { CreateRFQHeaderRepository } from './repository/rfq-header.repository';
import { CreateRFQLineRepository } from './repository/rfq-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { RFQMapper } from './mapper/create-rfq-header.mapper';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateRFQLineMapper } from './mapper/create-rfq-line.mapper';
import { CreateRFQVendorMapper } from './mapper/create-rfq-vendor.mapper';
import { CreateRFQVendorRepository } from './repository/rfq-vendor.repository';
import { UpdateRFQHeaderDTO } from './dto/update-rfq-header.dto';
import { UpdateRFQHeaderMapper } from './mapper/update-rfq-header.mapper';
import { UpdateRFQLineMapper } from './mapper/update-rfq-line.mapper';
import { UpdateRFQVendorMapper } from './mapper/update-rfq-vendor-mapper';
import { diffById } from '@/common/utils';
import { AuditService } from '@/modules/audit/audit.service';
import { SendMailRFQDTO } from './dto/send-to-vendor.dto';
import { PdfService } from '@/modules/pdf/pdf.service';
import { MailService } from '@/modules/mail/mail.service';
import { buildRFQEmailTemplate } from './templates/rfq-email.template';


@Injectable()
export class RfqService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly createRFQHeaderRepository: CreateRFQHeaderRepository,
        private readonly createRFQLineRepository: CreateRFQLineRepository,
        private readonly createRFQVendorRepository: CreateRFQVendorRepository,
        private readonly auditService: AuditService,
        private readonly pdfService: PdfService,
        private readonly mailService: MailService
    ) { }

    async createRFQ(rfqHeader: CreateRFQHeaderDTO, context: any) {
        try {
            const documentNo =
                await this.documentNumberService.generate({
                    module_code: 'RFQ',
                    document_type_code: 'RFQ',
                    branch_id: rfqHeader.branch_id ?? 0,
                });

            const rfqHeaderData =
                RFQMapper.toPrismaCreateInput(rfqHeader, documentNo);

            return this.prisma.$transaction(async (tx) => {

                // ⭐ create header
                const createdHeader =
                    await this.createRFQHeaderRepository.create(tx, rfqHeaderData);

                await this.auditService.logChanges(tx, {
                    module: 'PROCUREMENT',
                    documentNo: documentNo,
                    documentType: 'RFQ',
                    documentId: BigInt(createdHeader.rfq_id),
                    tableName: 'rfq_header',
                    recordId: BigInt(createdHeader.rfq_id),
                    oldData: null,
                    newData: createdHeader,
                    actionType: 'CREATE',
                    userId: BigInt(createdHeader.requested_by_user_id),
                    requestId: context.request_id,
                    clientIp: context.client_ip,
                    userAgent: context.user_agent,
                });

                // ⭐ map lines
                const rfqLineData =
                    CreateRFQLineMapper.toPrismaCreateInput(
                        rfqHeader.rfqLines ?? [],
                        createdHeader.rfq_id
                    );

                // ⭐ create many
                if (rfqLineData.length > 0) {

                    await this.createRFQLineRepository.createMany(tx, rfqLineData);

                    for (const line of rfqLineData) {
                        await this.auditService.logChanges(tx, {
                            module: 'PROCUREMENT',
                            documentNo: documentNo,
                            documentType: 'RFQ',
                            documentId: BigInt(createdHeader.rfq_id),
                            tableName: 'rfq_line',
                            recordId: BigInt(0), // createMany ไม่มี id
                            oldData: null,
                            newData: line,
                            actionType: 'CREATE',
                            userId: BigInt(createdHeader.requested_by_user_id),
                            requestId: context.request_id,
                            clientIp: context.client_ip,
                            userAgent: context.user_agent,
                        });
                    }

                }

                // ⭐ map vendors
                const rfqVendorData =
                    CreateRFQVendorMapper.toPrismaCreateInput(
                        rfqHeader.rfqVendors ?? [],
                        createdHeader.rfq_id
                    );

                // ⭐ create many
                if (rfqVendorData.length > 0) {
                    // await this.createRFQVendorRepository.createMany(tx, rfqVendorData);


                    for (const vendor of rfqVendorData) {
                        const created = await tx.rfq_vendor.create({
                            data: vendor
                        });
                        await this.auditService.logChanges(tx, {
                            module: 'PROCUREMENT',
                            documentNo: documentNo,
                            documentType: 'RFQ',
                            documentId: BigInt(createdHeader.rfq_id),
                            tableName: 'rfq_vendor',
                            recordId: BigInt(created.rfq_vendor_id),
                            oldData: null,
                            newData: vendor,
                            actionType: 'CREATE',
                            userId: BigInt(createdHeader.requested_by_user_id),
                            requestId: context.request_id,
                            clientIp: context.client_ip,
                            userAgent: context.user_agent,
                        });
                    }
                }

                return { createdHeader, rfqLineData, rfqVendorData };

            });
        } catch (error) {
            throw error;
        }
    }

    async findAll(page: number, pageSize: number) {

        const skip = (page - 1) * pageSize;

        const [data, total] = await Promise.all([
            this.prisma.rfq_header.findMany({
                skip,
                take: pageSize,
                select: {
                    rfq_id: true,
                    rfq_no: true,
                    rfq_date: true,
                    status: true,
                    quotation_due_date: true,
                    remarks: true,
                    created_at: true,

                    // ✅ ชื่อผู้สร้าง
                    requested_by_user: {
                        select: {
                            employee_id: true,
                            employee_firstname_th: true,
                            employee_lastname_th: true,
                        }
                    }, 

                    // ✅ จำนวน vendor ทั้งหมด และที่ส่งแล้ว
                    rfqVendors: {
                        select: {
                            rfq_vendor_id: true,
                            status: true,
                            sent_at: true,
                            vendor: {
                                select: {
                                    vendor_id: true,
                                    vendor_name: true,
                                }
                            }
                        }
                    },

                    // ✅ จำนวน line
                    _count: {
                        select: { rfqLines: true }
                    },
                },
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.rfq_header.count(),
        ]);

        // ✅ คำนวณ vendor stats ใน application layer
        const result = data.map((rfq) => ({
            ...rfq,
            vendor_total: rfq.rfqVendors.length,
            vendor_sent: rfq.rfqVendors.filter(v => v.status === 'SENT').length,
            line_count: rfq._count.rfqLines,
        }));

        return {
            data: result,
            total,
            page,
            pageSize,
        };
    }


    async findOne(rfq_id: number) {
        return this.prisma.rfq_header.findUnique({
            where: { rfq_id },
            include: {
                rfqLines: true,
                rfqVendors: { where: { is_active: true } },
            },
        });
    }


    async updateRFQ(dto: UpdateRFQHeaderDTO, rfq_id: number, context: any) {

        return this.prisma.$transaction(async (tx) => {

            // ================= HEADER =================

            const headerData =
                UpdateRFQHeaderMapper.toPrismaUpdateInput(dto, rfq_id);

            const oldHeader = await tx.rfq_header.findUnique({
                where: { rfq_id }
            });

            const updatedHeader =
                await this.createRFQHeaderRepository.update(tx, rfq_id, headerData);

            if (updatedHeader.status === 'APPROVED') {
                throw new Error('Cannot update approved RFQ');
            }

            await this.auditService.logChanges(tx, {
                module: 'PROCUREMENT',
                documentNo: updatedHeader.rfq_no,
                documentType: 'RFQ',
                documentId: BigInt(updatedHeader.rfq_id),
                tableName: 'rfq_header',
                recordId: BigInt(updatedHeader.rfq_id),
                oldData: oldHeader,
                newData: updatedHeader,
                actionType: 'UPDATE',
                userId: BigInt(updatedHeader.requested_by_user_id),
                requestId: context.request_id,
                clientIp: context.client_ip,
                userAgent: context.user_agent,
            });


            // ================= LINES =================

            const existingLines = await tx.rfq_line.findMany({
                where: { rfq_id }
            });

            const incomingLines = dto.rfqLines ?? [];

            const lineDiff = diffById(
                existingLines,
                incomingLines,
                'rfq_line_id'
            );

            // 🔴 DELETE
            if (lineDiff.toDelete.length > 0) {

                await tx.rfq_line.deleteMany({
                    where: {
                        rfq_line_id: {
                            in: lineDiff.toDelete.map(l => l.rfq_line_id)
                        }
                    }
                });

                for (const line of lineDiff.toDelete) {

                    await this.auditService.logChanges(tx, {
                        module: 'PROCUREMENT',
                        documentNo: updatedHeader.rfq_no,
                        documentType: 'RFQ',
                        documentId: BigInt(updatedHeader.rfq_id),
                        tableName: 'rfq_line',
                        recordId: BigInt(line.rfq_line_id),
                        oldData: line,
                        newData: null,
                        actionType: 'DELETE',
                        userId: BigInt(updatedHeader.requested_by_user_id),
                        requestId: context.request_id,
                        clientIp: context.client_ip,
                        userAgent: context.user_agent,
                    });
                }
            }

            // 🟢 CREATE
            // 🟢 CREATE
            if (lineDiff.toCreate.length > 0) {

                const createData =
                    CreateRFQLineMapper.toPrismaCreateInput(
                        lineDiff.toCreate,
                        rfq_id
                    );

                for (const data of createData) {

                    const created = await tx.rfq_line.create({
                        data
                    });

                    await this.auditService.logChanges(tx, {
                        module: 'PROCUREMENT',
                        documentNo: updatedHeader.rfq_no,
                        documentType: 'RFQ',
                        documentId: BigInt(updatedHeader.rfq_id),
                        tableName: 'rfq_line',
                        recordId: BigInt(created.rfq_line_id),
                        oldData: null,
                        newData: created,
                        actionType: 'CREATE',
                        userId: BigInt(updatedHeader.requested_by_user_id),
                        requestId: context.request_id,
                        clientIp: context.client_ip,
                        userAgent: context.user_agent,
                    });
                }
            }


            // 🔵 UPDATE
            if (lineDiff.toUpdate.length > 0) {

                for (const line of lineDiff.toUpdate) {

                    const oldLine = existingLines.find(
                        l => l.rfq_line_id === line.rfq_line_id
                    );

                    const updated = await tx.rfq_line.update({
                        where: { rfq_line_id: line.rfq_line_id },
                        data: UpdateRFQLineMapper.toData(line, rfq_id)
                    });

                    await this.auditService.logChanges(tx, {
                        module: 'PROCUREMENT',
                        documentNo: updatedHeader.rfq_no,
                        documentType: 'RFQ',
                        documentId: BigInt(updatedHeader.rfq_id),
                        tableName: 'rfq_line',
                        recordId: BigInt(updated.rfq_line_id),
                        oldData: oldLine,
                        newData: updated,
                        actionType: 'UPDATE',
                        userId: BigInt(updatedHeader.requested_by_user_id),
                        requestId: context.request_id,
                        clientIp: context.client_ip,
                        userAgent: context.user_agent,
                    });
                }
            }


            // ================= VENDORS =================

            const existingVendors = await tx.rfq_vendor.findMany({
                where: { rfq_id }
            });

            const incomingVendors = dto.rfqVendors ?? [];

            const vendorDiff = diffById(
                existingVendors,
                incomingVendors,
                'rfq_vendor_id'
            );

            // DELETE
            if (vendorDiff.toDelete.length > 0) {

                await tx.rfq_vendor.updateMany({
                    where: {
                        rfq_vendor_id: {
                            in: vendorDiff.toDelete.map(v => v.rfq_vendor_id)
                        }
                    },
                    data: { is_active: false }
                });
            }

            // CREATE
            if (vendorDiff.toCreate.length > 0) {

                const createVendorData =
                    CreateRFQVendorMapper.toPrismaCreateInput(
                        vendorDiff.toCreate,
                        rfq_id
                    );

                await tx.rfq_vendor.createMany({ data: createVendorData });

                for (const vendor of createVendorData) {

                    const oldVendor = existingVendors.find(
                        l => l.rfq_vendor_id === vendor.rfq_vendor_id
                    );

                    await this.auditService.logChanges(tx, {
                        module: 'PROCUREMENT',
                        documentNo: updatedHeader.rfq_no,
                        documentType: 'RFQ',
                        documentId: BigInt(updatedHeader.rfq_id),
                        tableName: 'rfq_vendor',
                        recordId: BigInt(updatedHeader.requested_by_user_id),
                        oldData: null,
                        newData: oldVendor,
                        actionType: 'CREATE',
                        userId: BigInt(updatedHeader.requested_by_user_id),
                        requestId: context.request_id,
                        clientIp: context.client_ip,
                        userAgent: context.user_agent,
                    });
                }
            }

            // UPDATE
            if (vendorDiff.toUpdate.length > 0) {

                for (const vendor of vendorDiff.toUpdate) {

                    const oldVendor = existingVendors.find(
                        v => v.rfq_vendor_id === vendor.rfq_vendor_id
                    );

                    const updatedVendor = await tx.rfq_vendor.update({
                        where: { rfq_vendor_id: vendor.rfq_vendor_id },
                        data: UpdateRFQVendorMapper.toData(vendor, rfq_id)
                    });

                    await this.auditService.logChanges(tx, {
                        module: 'PROCUREMENT',
                        documentNo: updatedHeader.rfq_no,
                        documentType: 'RFQ',
                        documentId: BigInt(updatedHeader.rfq_id),
                        tableName: 'rfq_vendor',
                        recordId: BigInt(updatedVendor.rfq_vendor_id),
                        oldData: oldVendor,
                        newData: updatedVendor,
                        actionType: 'UPDATE',
                        userId: BigInt(updatedHeader.requested_by_user_id),
                        requestId: context.request_id,
                        clientIp: context.client_ip,
                        userAgent: context.user_agent,
                    });
                }
            }

            return updatedHeader;

        });

    }

    async findVendors(rfq_id: number) {

        const data = await this.prisma.rfq_vendor.findMany({
            where: { rfq_id },
            include: {
                vendor: true
            }
        });

        return data.map(({ vendor, ...rest }) => ({
            ...rest,
            ...vendor
        }));
    }

    //-------------- send to vendor ----------------
    async sendToVendor(rfq_vendor_id: number, dto: SendMailRFQDTO, context: any) {

        // 1️⃣ ดึงข้อมูล
        const rfqVendor = await this.prisma.rfq_vendor.findUnique({
            where: { rfq_vendor_id },
            include: {
                rfq: {
                    include: {
                        rfqLines: {
                            include: { item: true }
                        }
                    }
                },
                vendor: true
            }
        });

        // 2️⃣ guard — ตรวจสอบก่อนทำงาน
        if (!rfqVendor) {
            throw new NotFoundException(`ไม่พบ RFQ Vendor ID: ${rfq_vendor_id}`);
        }

        // if (rfqVendor.status === 'SENT') {
        //     throw new BadRequestException('ส่งใบขอเสนอราคานี้ไปแล้ว');
        // }

        if (!rfqVendor.vendor.email) {
            throw new BadRequestException('Vendor ไม่มี email กรุณาตรวจสอบข้อมูล');
        }

        // 3️⃣ สร้าง PDF และ email template
        const pdfBuffer = await this.pdfService.generateRFQ(rfqVendor);
        const html = buildRFQEmailTemplate(rfqVendor.rfq, rfqVendor.vendor);

        // 4️⃣ รวม email จาก dto.to + vendor email (ไม่ทิ้งของเดิม)
        const toList = dto.to?.length
            ? dto.to
            : [rfqVendor.vendor.email];

        // 5️⃣ ส่ง email
        await this.mailService.send({
            to: toList,
            cc: dto.cc ?? [],
            subject: dto.subject || `RFQ ${rfqVendor.rfq.rfq_no}`,
            html,
            attachments: [{
                filename: `RFQ_${rfqVendor.rfq.rfq_no}.pdf`,  // ชื่อไฟล์ชัดเจนขึ้น
                content: pdfBuffer,
                contentType: 'application/pdf',
            }],
        });

        // 6️⃣ อัปเดตสถานะ — ของเดิมลืม step นี้!
        return this.prisma.rfq_vendor.update({
            where: { rfq_vendor_id },
            data: {
                status: 'SENT',
                sent_at: new Date(),
                 contact_email: Array.isArray(toList) ? toList.join(',') : toList,// บันทึกว่าส่งไปที่ไหน
            },
        });
    }
    async getRFQVendorPDF(rfq_vendor_id: number) {

        const data = await this.prisma.rfq_vendor.findUnique({
            where: { rfq_vendor_id },
            include: {
                rfq: {
                    include: {
                        rfqLines: {
                            include: { item: true }
                        }
                    }
                },
                vendor: true
            }
        });

        if (!data) {
            throw new NotFoundException('RFQ Vendor not found');
        }

        // ⭐⭐ จุดสำคัญ ⭐⭐
        const pdfBuffer = await this.pdfService.generateRFQ(data);
        // console.log(data);
        return pdfBuffer;
    }

    async findPRWithoutRFQ(page: number, pageSize: number) {

        const data = await this.prisma.pr_header.findMany({
            where: {
                status: 'APPROVED',
            },
            include: {
                prLines: true,
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const count = await this.prisma.pr_header.count({
            where: {
                status: 'APPROVED',
            },
        });

        return { data, count };
    }

}

