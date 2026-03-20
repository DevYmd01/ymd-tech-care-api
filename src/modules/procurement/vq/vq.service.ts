import { Injectable } from '@nestjs/common';
import { CreateVQHeaderDTO } from './dto/create-vq-header.bto';
import { CreateVQLineDTO } from './dto/create-vq-line.dto';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateVQHeaderRepository } from './repository/create-vq-header.repository';
import { CreateVQLineRepository } from './repository/create-vq-line.repository';
import { VqTaxService } from './domain/vq-tax.service';
import { Decimal } from '@prisma/client/runtime/library';
import { VqCalculationDomainService } from './domain/vq-calculation.domain.service';
import { VQHeaderMapper } from './mapper/create-vq-header.mapper';
import { VQLineMapper } from './mapper/create-vq-line.mapper';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogRepository } from './repository/audit-log.repository';
import { UpdateVQHeaderDTO } from './dto/update-vq-header.dto';
import { UpdateVQLineDTO } from './dto/update-vq-line.dto';
import { diffById } from '@/common/utils';
import { UpdateVQHeaderMapper } from './mapper/update-vq-header.mapper';
import { UpdateVQLineMapper } from './mapper/update-vq-line.mapper';
import { UpdateVQHeaderRepository } from './repository/update-vq-header.repository';
import { UpdateVQLineRepository } from './repository/update-vq-line.repository';
import { Prisma } from '@prisma/client';
import { SearchVQDto } from './dto/search-vq.dto';

@Injectable()
export class VqService {
    constructor(

        private readonly auditLogRepository: AuditLogRepository,
        private readonly prisma: PrismaService,
        private readonly vqCalculationDomainService: VqCalculationDomainService,
        private readonly createVQHeaderRepository: CreateVQHeaderRepository,
        private readonly createVQLineRepository: CreateVQLineRepository,
        private readonly updateVQHeaderRepository: UpdateVQHeaderRepository,
        private readonly updateVQLineRepository: UpdateVQLineRepository,
        private readonly DocumentNumberService: DocumentNumberService,
        private readonly vqTaxService: VqTaxService,
    ) { }

    async create(createVQHeaderDto: CreateVQHeaderDTO, context: any) {



        return this.prisma.$transaction(async (tx) => {

            const documentNo =
                await this.DocumentNumberService.generate({
                    module_code: 'VQ',
                    document_type_code: 'VQ',
                    branch_id: 0,
                });

            const taxConfig = await this.vqTaxService.getTaxById(createVQHeaderDto.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            const calculatedLines: {
                line: CreateVQLineDTO;
                calc: any;
            }[] = [];


            for (const line of createVQHeaderDto.vq_lines) {
                const lineAmount = this.vqCalculationDomainService.calculateLine({
                    qty: line.qty,
                    unit_price: line.unit_price,
                    discount_expression: line.discount_expression ? String(line.discount_expression) : undefined,
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            const headerDocTotals = this.vqCalculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: createVQHeaderDto.exchange_rate,
                discount_expression: String(createVQHeaderDto.discount_expression),
                tax_rate: taxRate.toNumber(),
            });

            const createVQHeaderData = VQHeaderMapper.toPrismaCreateInput(createVQHeaderDto, documentNo, headerDocTotals);
            const createdHeader = await this.createVQHeaderRepository.create(
                tx,
                createVQHeaderData
            );

            // update เพื่อบอก
            await this.prisma.rfq_vendor.updateMany({
                where: {
                    rfq_id: createdHeader.rfq_id,
                },
                data: {
                    status: 'RECORDED', // example
                },
            });



            for (const { line, calc } of calculatedLines) {
                const createVQLineData =
                    VQLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        createdHeader.vq_header_id
                    );
                await this.createVQLineRepository.create(
                    tx,
                    createVQLineData
                );
            }

            await this.auditLogRepository.create(tx, createdHeader, context);

            return this.prisma.vq_header.findUnique({
                where: { vq_header_id: createdHeader.vq_header_id },
                include: {
                    vqLines: true,
                },
            });

        });

    }

    findAll() {
        return this.prisma.vq_header.findMany({

        });
    }

    findOne(id: number) {
        return this.prisma.vq_header.findUnique({
            where: { vq_header_id: id },
            include: {
                vqLines: true,
            },
        });
    }


    async update(
        id: number,
        updateVqDto: UpdateVQHeaderDTO,
        context: any,
    ) {
        return this.prisma.$transaction(async (tx) => {

            // 1️⃣ หา header เดิม
            const existingHeader = await tx.vq_header.findUnique({
                where: { vq_header_id: id },
                include: { vqLines: true },
            });

            if (!existingHeader) {
                throw new Error('VQ not found');
            }

            // 2️⃣ tax config
            const taxConfig = await this.vqTaxService.getTaxById(updateVqDto.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let subtotal = new Decimal(0);
            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);

            const calculatedLines: {
                line: UpdateVQLineDTO;
                calc: any;
            }[] = [];

            // 3️⃣ คำนวณ line ใหม่ทั้งหมด
            for (const line of updateVqDto.vq_lines) {
                const lineAmount = this.vqCalculationDomainService.calculateLine({
                    qty: line.qty,
                    unit_price: line.unit_price,
                    discount_expression: line.discount_expression
                        ? String(line.discount_expression)
                        : undefined,
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            // 4️⃣ คำนวณ header total ใหม่
            const headerTotals =
                this.vqCalculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: updateVqDto.exchange_rate,
                    discount_expression: String(updateVqDto.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

            // 5️⃣ update header
            const updateHeaderData =
                UpdateVQHeaderMapper.toPrismaUpdateInput(updateVqDto, headerTotals);

            const updatedHeader =
                await this.updateVQHeaderRepository.update(
                    tx,
                    id,
                    updateHeaderData,
                );

            // 6️⃣ diff lines
            const diff = diffById(
                existingHeader.vqLines,
                updateVqDto.vq_lines,
                'vq_line_id',
            );

            // 7️⃣ delete
            for (const line of diff.toDelete) {
                await tx.vq_line.delete({
                    where: { vq_line_id: line.vq_line_id },
                });
            }

            // 8️⃣ update
            for (const line of diff.toUpdate) {
                const calc = calculatedLines.find(
                    (l) => l.line.vq_line_id === line.vq_line_id,
                )?.calc;

                const updateLineData =
                    UpdateVQLineMapper.toPrismaUpdateInput(line, calc, updatedHeader.vq_header_id);

                if (!line.vq_line_id) {
                    throw new Error('vq_line_id is required for update');
                }

                await this.updateVQLineRepository.update(
                    tx,
                    line.vq_line_id,
                    updateLineData,
                );
            }

            // 9️⃣ create
            for (const line of diff.toCreate) {
                const calc = calculatedLines.find(
                    (l) => !l.line.vq_line_id && l.line === line,
                )?.calc;

                const createLineData =
                    VQLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        updatedHeader.vq_header_id,
                    );

                await this.createVQLineRepository.create(
                    tx,
                    createLineData,
                );
            }

            // 🔟 audit
            await this.auditLogRepository.create(tx, updatedHeader, context);

            return tx.vq_header.findUnique({
                where: { vq_header_id: id },
                include: {
                    vqLines: true,
                },
            });
        });
    }

    async findAllByVQ(query: SearchVQDto) {

        const {
            page = 1,
            limit = 20,
            tab,
            sort,
            pr_no,
            rfq_no,
            vq_no,
            creator_name,
            vendor_name,
            status,
            date_start,
            date_end
        } = query;

        const skip = (page - 1) * limit;
        const isAllTab = !tab || tab === 'ALL';

        let finalData: any[] = [];
        let totalCount = 0;

        if (isAllTab) {
            const filters: Prisma.vq_headerWhereInput[] = [];

            if (vq_no) filters.push({ vq_no: { contains: vq_no, mode: 'insensitive' } });
            if (rfq_no) filters.push({ rfq_vendor: { rfq: { rfq_no: { contains: rfq_no, mode: 'insensitive' } } } });
            if (pr_no) filters.push({ rfq_vendor: { rfq: { pr: { pr_no: { contains: pr_no, mode: 'insensitive' } } } } });
            if (vendor_name) filters.push({ vendor: { vendor_name: { contains: vendor_name, mode: 'insensitive' } } });
            if (creator_name) {
                filters.push({
                    createdVqHeaders: {
                        OR: [
                            { employee_firstname_th: { contains: creator_name, mode: 'insensitive' } },
                            { employee_lastname_th: { contains: creator_name, mode: 'insensitive' } }
                        ]
                    }
                });
            }
            if (status) filters.push({ status });
            if (date_start || date_end) {
                filters.push({
                    created_at: {
                        ...(date_start && { gte: new Date(date_start) }),
                        ...(date_end && { lte: new Date(new Date(date_end).setHours(23, 59, 59, 999)) }),
                    }
                });
            }

            const where: Prisma.vq_headerWhereInput = filters.length > 0 ? { AND: filters } : {};

            const [data, total] = await Promise.all([
                this.prisma.vq_header.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { created_at: 'desc' },
                    include: {
                        vendor: true,
                        createdVqHeaders: true,
                        rfq_vendor: {
                            include: {
                                rfq: {
                                    include: { pr: true }
                                }
                            }
                        }
                    }
                }),
                this.prisma.vq_header.count({ where })
            ]);

            totalCount = total;
            finalData = data.map((item) => ({
                vq_id: item.vq_header_id,
                vq_no: item.vq_no,
                payment_term_days: item.payment_term_days,
                exchange_rate: item.exchange_rate,
                quotation_date: item.quotation_date,
                base_total_amount: item.base_total_amount,
                lead_time_days: item.lead_time_days,
                discount_expression: item.discount_expression,
                quotation_expiry_date: item.quotation_expiry_date,
                status: item.status,
                vendor_name: item.vendor?.vendor_name,
                created_at: item.created_at,
                vendor: item.vendor,
                rfq: item.rfq_vendor?.rfq,
                pr: item.rfq_vendor?.rfq?.pr,
                // creator: item.createdVqHeaders,
            }));

        } else if (tab === 'WAITING_VQ') {
            const filters: Prisma.rfq_vendorWhereInput[] = [];

            // 🔹 เงื่อนไขบังคับสำหรับ Tab "รอสร้าง VQ" (WAITING_VQ)
            filters.push({
                is_active: true,
                status: { in: ['DRAFT', 'PENDING', 'SENT', 'ACTIVE'] },
                vq_header: { none: {} } // กรองเฉพาะ RFQ Vendor ที่ยังไม่มีการสร้าง VQ (None) เท่านั้น
            });

            if (rfq_no) filters.push({ rfq: { rfq_no: { contains: rfq_no, mode: 'insensitive' } } });
            if (pr_no) filters.push({ rfq: { pr: { pr_no: { contains: pr_no, mode: 'insensitive' } } } });
            if (vendor_name) filters.push({ vendor: { vendor_name: { contains: vendor_name, mode: 'insensitive' } } });
            if (creator_name) {
                filters.push({
                    rfq: {
                        requested_by_user: {
                            OR: [
                                { employee_firstname_th: { contains: creator_name, mode: 'insensitive' } },
                                { employee_lastname_th: { contains: creator_name, mode: 'insensitive' } }
                            ]
                        }
                    }
                });
            }

            // จัดการกรณีมีการส่ง status search มา
            if (status && ['DRAFT', 'PENDING', 'SENT', 'ACTIVE'].includes(status)) {
                filters.push({ status });
            } else if (status) {
                // หากส่งสถานะมาค้นหาใน tab นี้ และไม่เข้าพวกเลย บังคับให้หาไม่เจอ
                filters.push({ rfq_vendor_id: -1 });
            }

            if (date_start || date_end) {
                filters.push({
                    created_at: {
                        ...(date_start && { gte: new Date(date_start) }),
                        ...(date_end && { lte: new Date(new Date(date_end).setHours(23, 59, 59, 999)) }),
                    }
                });
            }

            const where: Prisma.rfq_vendorWhereInput = { AND: filters };

            const [data, total] = await Promise.all([
                this.prisma.rfq_vendor.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { created_at: 'desc' },
                    include: {
                        vendor: true,
                        rfq: {
                            include: {
                                pr: true,
                                requested_by_user: true
                            }
                        }
                    }
                }),
                this.prisma.rfq_vendor.count({ where })
            ]);

            totalCount = total;
            finalData = data.map((item) => ({
                rfq_vendor_id: item.rfq_vendor_id,
                rfq_id: item.rfq?.rfq_id,
                rfq_no: item.rfq?.rfq_no,
                pr_id: item.rfq?.pr?.pr_id,
                pr_no: item.rfq?.pr?.pr_no,
                vendor: item.vendor,
                status: item.status, // ดึงจาก rfq_vendor
                created_at: item.created_at,
                creator: item.rfq?.requested_by_user, // ดึงจากคนสร้าง rfq
            }));

        } else if (tab === 'WAITING_RFQ') {
            const validStatuses = ['DRAFT', 'PENDING', 'SENT', 'ACTIVE'];
            
            // 🔹 สร้างเงื่อนไขสำหรับค้นหาผู้ขายใน RFQ
            const vendorCondition: Prisma.rfq_vendorWhereInput = {
                is_active: true,
                status: { in: validStatuses },
            };

            if (vendor_name) {
                vendorCondition.vendor = { vendor_name: { contains: vendor_name, mode: 'insensitive' } };
            }

            if (status) {
                if (validStatuses.includes(status)) {
                    vendorCondition.status = status;
                } else {
                    vendorCondition.rfq_vendor_id = -1; // ถ้าหาสถานะที่ไม่เกี่ยวข้อง บังคับไม่ให้เจอ
                }
            }

            const filters: Prisma.rfq_headerWhereInput[] = [];
            
            filters.push({ rfqVendors: { some: vendorCondition } });

            if (rfq_no) filters.push({ rfq_no: { contains: rfq_no, mode: 'insensitive' } });
            if (pr_no) filters.push({ pr: { pr_no: { contains: pr_no, mode: 'insensitive' } } });
            if (creator_name) {
                filters.push({
                    requested_by_user: {
                        OR: [
                            { employee_firstname_th: { contains: creator_name, mode: 'insensitive' } },
                            { employee_lastname_th: { contains: creator_name, mode: 'insensitive' } }
                        ]
                    }
                });
            }
            if (date_start || date_end) {
                filters.push({
                    created_at: {
                        ...(date_start && { gte: new Date(date_start) }),
                        ...(date_end && { lte: new Date(new Date(date_end).setHours(23, 59, 59, 999)) }),
                    }
                });
            }

            const where: Prisma.rfq_headerWhereInput = { AND: filters };

            const [rows, total] = await Promise.all([
                this.prisma.rfq_header.findMany({
                    where,
                    include: {
                        pr: true,
                        rfqVendors: {
                            where: vendorCondition, // กรองเฉพาะ Vendor ที่เข้าเงื่อนไขการค้นหาคืนกลับไปด้วย
                            include: {
                                vendor: true,
                            },
                        },
                        requested_by_user: true,
                    },
                    skip,
                    take: limit,
                    orderBy: { created_at: 'desc' },
                }),
                this.prisma.rfq_header.count({ where }),
            ]);

            totalCount = total;
            finalData = rows.map((row) => ({
                rfq_id: row.rfq_id,
                rfq_no: row.rfq_no,
                rfq_date: row.rfq_date,
                status: row.status,
                remarks: row.remarks,
                pr_id: row.pr?.pr_id,
                pr_no: row.pr?.pr_no,
                quotation_due_date: row.quotation_due_date,
                requested_by_user: row.requested_by_user?.employee_fullname,
                vendors: row.rfqVendors.map(v => ({
                    rfq_vendor_id: v.rfq_vendor_id,
                    vendor_id: v.vendor?.vendor_id,
                    vendor_code: v.vendor?.vendor_code,
                    vendor_name: v.vendor?.vendor_name,
                    status: v.status,
                })),
                created_at: row.created_at,
            }));

          

        }

        return {
            data: finalData,
            total: totalCount,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit),
        };
    }

    async findPRWithoutRFQ(rfq_id: number, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const rows = await this.prisma.rfq_vendor.findMany({
            where: {
                is_active: true,
                rfq_id: rfq_id,
            },
            include: {
                rfq: {
                    include: {
                        pr: true,   // 👈 include PR
                    },
                },
                vendor: true,
                vq_header: true,
            },
            skip,
            take: pageSize,
        });

        const data = rows.map((row) => ({
            rfq_vendor_id: row.rfq_vendor_id,

            pr_id: row.rfq?.pr?.pr_id,
            pr_no: row.rfq?.pr?.pr_no,

            rfq_id: row.rfq?.rfq_id,
            rfq_no: row.rfq?.rfq_no,
            rfq_date: row.rfq?.rfq_date,

            vendor_id: row.vendor?.vendor_id,
            vendor_code: row.vendor?.vendor_code,
            vendor_name: row.vendor?.vendor_name,
            vendor_email: row.vendor?.email,

            quotation_count: row.vq_header?.length || 0,
            vq_no: row.vq_header?.[0]?.vq_no || null, // สมมติเอาแค่เลขที่ VQ แรกถ้ามี
            status: row.status,
            created_at: row.created_at,
        }));

        return {
            data,
            page,
            pageSize,
        };
    }

    async findPRWithoutVQ(page: number = 1, pageSize: number = 20) {
        const skip = (page - 1) * pageSize;

        const validStatuses = ['DRAFT', 'PENDING', 'SENT', 'ACTIVE'];

        const where: Prisma.rfq_headerWhereInput = {
            rfqVendors: {
                some: {
                    is_active: true,
                    status: { in: validStatuses },
                },
            },
        };

        const [rows, total] = await Promise.all([
            this.prisma.rfq_header.findMany({
                where,
                include: {
                    pr: true,
                    rfqVendors: {
                        where: {
                            is_active: true,
                            status: { in: validStatuses },
                        },
                        include: {
                            vendor: true,
                        },
                    },
                },
                skip,
                take: pageSize,
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.rfq_header.count({ where }),
        ]);

        const data = rows.map((row) => ({
            rfq_id: row.rfq_id,
            rfq_no: row.rfq_no,
            pr_id: row.pr?.pr_id,
            pr_no: row.pr?.pr_no,
            vendors: row.rfqVendors.map(v => ({
                rfq_vendor_id: v.rfq_vendor_id,
                vendor_id: v.vendor?.vendor_id,
                vendor_code: v.vendor?.vendor_code,
                vendor_name: v.vendor?.vendor_name,
                status: v.status,
            })),
            created_at: row.created_at,
        }));

        return {
            data,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async findVQLines(vq_id: number) {
        return this.prisma.vq_line.findMany({
            where: {
                vq_header_id: vq_id,
            },
            include: {
                item: true,
            },
        });
    }


}
