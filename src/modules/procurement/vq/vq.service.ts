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

    async findAllByVendor() {
        return this.prisma.rfq_vendor.findMany({
            include: {
                rfq: true,
                vendor: true,

            },
        });
    }

    async findPRWithoutRFQ(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const rows = await this.prisma.rfq_vendor.findMany({
            where: {
                is_active: true,
                rfq: {
                    status: 'WAITING_FOR_RFQ',
                },
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
            status: row.status,
            created_at: row.created_at,
        }));

        return {
            data,
            page,
            pageSize,
        };
    }

    async findPRWithoutVQ(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const rows = await this.prisma.rfq_vendor.findMany({
            where: {
                is_active: true,
                rfq: {
                    status: 'WAITING_FOR_VQ',
                },
                vq_header: {
                    none: {}, // 👈 ไม่มี quotation
                },
            },
            include: {
                rfq: {
                    include: {
                        pr: true,
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

            status: row.status,
            created_at: row.created_at,
        }));

        return {
            data,
            page,
            pageSize,
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


