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
import { PrTaxService } from './domain/pr-tax.service';
import { PrCalculationService } from './domain/pr-calculation.service';
import { Decimal } from '@prisma/client/runtime/library';
import { UpdatePRHeaderDTO } from './dto/update-pr-header.dto';
import { UpdatePRLineDTO } from './dto/update-pr-line.dto';
import { UpdatePRHeaderRepository } from './repositories/update-pr-header.ropository';
import { UpdatePRLineRepository } from './repositories/update-pr-line-repository';

@Injectable()
export class PrService {
    constructor(
        private prCalculationService: PrCalculationService,
        private prTaxService: PrTaxService,
        private prisma: PrismaService,
        private prHeaderRepo: PRHeaderRepository,
        private documentNumberService: DocumentNumberService,
        private prLineRepo: CreatePRLineRepository,
        private createAuditLogRepo: CreateAuditLogRepository,
        private updatePRHeaderRepository: UpdatePRHeaderRepository,
        private updatePRLineRepository: UpdatePRLineRepository,
    ) { }

    // ==============================
    // create pr
    // ==============================
    async create(dto: CreatePRHeaderDTO, context: any) {
        try {
            return await this.prisma.$transaction(async (tx) => {

                // ==============================
                // 1️⃣ Generate Document No
                // ==============================
                const documentNo = await this.documentNumberService.generate({
                    module_code: 'PR',
                    document_type_code: 'PR',
                    branch_id: dto.branch_id ?? 0,
                });

                // ==============================
                // 2️⃣ Get Tax Config
                // ==============================
                const taxConfig = await this.prTaxService.getTaxById(dto.pr_tax_code_id);
                const taxRate = new Decimal(taxConfig.tax_rate).div(100);

                // ==============================
                // 3️⃣ Calculate Lines (NO INSERT YET)
                // ==============================
                let headerDocSubtotal = new Decimal(0);
                let headerDocTaxTotal = new Decimal(0);
                let headerDocTotal = new Decimal(0);
                let headerDocLineDiscountTotal = new Decimal(0);

                const calculatedLines: {
                    line: CreatePRLineDTO;
                    calc: any;
                }[] = [];

                for (const line of dto.lines) {

                    const calc = this.prCalculationService.calculateLineAmount({
                        qty: line.qty,
                        unitPrice: line.est_unit_price,
                        discountInput: line.line_discount_raw,
                        taxRate: Number(taxRate),
                    });

                    headerDocSubtotal = headerDocSubtotal.plus(calc.net);
                    headerDocTaxTotal = headerDocTaxTotal.plus(calc.tax);
                    headerDocTotal = headerDocTotal.plus(calc.total);
                    headerDocLineDiscountTotal =
                        headerDocLineDiscountTotal.plus(calc.discount_amount);

                    calculatedLines.push({ line, calc });
                }

                // ==============================
                // 4️⃣ Calculate Header Totals
                // ==============================
                const headerDocTotals =
                    this.prCalculationService.calculateHeaderTotals({
                        subtotal: Number(headerDocSubtotal),
                        discountInput: String(dto.pr_discount_raw),
                        taxRate: Number(taxRate),
                    });

                const headerBaseTotals =
                    this.prCalculationService.convertToBase(
                        headerDocTotals,
                        Number(dto.pr_exchange_rate),
                    );

                // ==============================
                // 5️⃣ Create Header FIRST
                // ==============================
                const header = {

                    pr_no: documentNo,
                    pr_date: new Date(dto.pr_date),
                    need_by_date: dto.need_by_date ? new Date(dto.need_by_date) : new Date(),
                    status: dto.status,
                    remark: dto.remark ?? null,
                    payment_term_days: dto.payment_term_days ?? null,
                    delivery_date: dto.delivery_date ? new Date(dto.delivery_date) : new Date(),
                    credit_days: dto.credit_days,
                    vendor_quote_no: dto.vendor_quote_no,
                    shipping_method: dto.shipping_method,
                    requester_name: dto.requester_name,

                    pr_exchange_rate_date: dto.pr_exchange_rate_date
                        ? new Date(dto.pr_exchange_rate_date)
                        : new Date(),

                    pr_base_currency_code: dto.pr_base_currency_code ?? null,
                    pr_quote_currency_code: dto.pr_quote_currency_code ?? null,
                    pr_exchange_rate: dto.pr_exchange_rate ?? null,

                    // ===== Totals =====
                    pr_quote_total_amount: headerDocTotals.total ?? 0,
                    pr_base_total_amount: headerBaseTotals.total ?? 0,
                    pr_tax_amount: headerBaseTotals.tax_total ?? 0,
                    pr_discount_amount: headerDocTotals.discount_amount ?? 0,
                    pr_discount_rate: headerDocTotals.total ?? 0,
                    pr_discount_raw: dto.pr_discount_raw ?? '',

                    // ===== Tax =====
                    pr_tax_rate: taxConfig.tax_rate ?? 0,

                    // ===== Relations =====
                    branch: {
                        connect: { branch_id: dto.branch_id },
                    },
                    pr_tax_code: {
                        connect: { tax_code_id: dto.pr_tax_code_id },
                    },
                    requester_user: {
                        connect: { employee_id: dto.requester_user_id },
                    },
                    ...(dto.project_id && {
                        project: {
                            connect: { project_id: dto.project_id },
                        },
                    }),
                    created_at: new Date(),
                    updated_at: new Date(),
                };

                const createdHeader = await this.prHeaderRepo.create(tx, header);

                // ==============================
                // 6️⃣ Create Lines AFTER Header
                // ==============================
                for (const item of calculatedLines) {

                    const { line, calc } = item;

                    const lineData: Prisma.pr_lineCreateInput = {

                        line_no: Number(line.line_no),
                        description: line.description,
                        location: line.location,
                        qty: Number(line.qty),
                        est_unit_price: Number(line.est_unit_price),
                        required_receipt_type: line.required_receipt_type,
                        line_discount_raw: line.line_discount_raw,

                        pr: {
                            connect: { pr_id: createdHeader.pr_id },
                        },

                        ...(line.item_id && {
                            item: {
                                connect: { item_id: line.item_id },
                            },
                        }),

                        ...(line.warehouse_id && {
                            warehouse: {
                                connect: { warehouse_id: line.warehouse_id },
                            },
                        }),

                        uom: {
                            connect: { uom_id: line.uom_id },
                        },

                        ...(taxConfig.tax_code_id && {
                            tax_code: {
                                connect: { tax_code_id: taxConfig.tax_code_id },
                            },
                        }),

                        tax_rate: Number(taxConfig.tax_rate) || 0,
                        line_amount: Number(calc.total) || 0,
                        tax_amount: Number(calc.tax) || 0,
                        line_discount_rate: Number(calc.discount_rate) || 0,
                        line_discount_amount: Number(calc.discount_amount) || 0,
                        line_net_amount: Number(calc.net) || 0,
                    };

                    await this.prLineRepo.create(tx, lineData);
                }

                // ==============================
                // 7️⃣ Audit Log
                // ==============================
                await this.createAuditLogRepo.create(tx, createdHeader, context);

                return createdHeader;
            });

        } catch (error) {
            console.error('PR CREATE ERROR:', error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {

                if (error.code === 'P2003') {
                    throw new BadRequestException(
                        `Foreign key constraint failed: ${error.meta?.constraint}`,
                    );
                }

                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        `Duplicate unique value: ${error.meta?.target}`,
                    );
                }

                throw new InternalServerErrorException(
                    `Database error: ${error.code}`,
                );
            }

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Unexpected server error during PR creation',
            );
        }
    }

    async findAll() {
        const result = await this.prisma.pr_header.findMany({
            select: {
                pr_id: true,
                pr_no: true,
                pr_date: true,
                need_by_date: true,
                pr_base_total_amount: true,
                remark: true,
                status: true,

                branch: {
                    select: {
                        branch_id: true,
                        branch_code: true,
                        branch_name: true,
                    },
                },

                pr_tax_code: {
                    select: {
                        tax_code_id: true,
                        tax_code: true,
                        tax_name: true,
                    },
                },

                requester_user: {
                    select: {
                        employee_id: true,
                        employee_code: true,
                        employee_firstname_th: true,
                        employee_lastname_th: true,
                        department: {
                            select: {
                                department_id: true,
                                department_code: true,
                                department_name: true,
                            },
                        },
                    },
                },
            },
        });

        return result.map((item) => ({
            pr_id: item.pr_id,
            pr_no: item.pr_no,
            pr_date: item.pr_date?.toISOString().split('T')[0],
            need_by_date: item.need_by_date?.toISOString().split('T')[0],
            pr_base_total_amount: item.pr_base_total_amount,
            remark: item.remark,
            status: item.status,

            branch_id: item.branch?.branch_id,
            branch_code: item.branch?.branch_code,
            branch_name: item.branch?.branch_name,

            tax_code_id: item.pr_tax_code?.tax_code_id,
            tax_code: item.pr_tax_code?.tax_code,
            tax_name: item.pr_tax_code?.tax_name,

            requester_id: item.requester_user?.employee_id,
            requester_code: item.requester_user?.employee_code,
            requester_name:
                `${item.requester_user?.employee_firstname_th ?? ''} ${item.requester_user?.employee_lastname_th ?? ''}`.trim(),
            department_id: item.requester_user?.department?.department_id,
            department_code: item.requester_user?.department?.department_code,
            department_name: item.requester_user?.department?.department_name,
        }));
    }


    async findOne(pr_id: number) {
        const header = await this.prisma.pr_header.findUnique({ where: { pr_id } });
        const lines = await this.prisma.pr_line.findMany({ where: { pr_id } });
        return { header, lines };
    }

    // ==============================
    // update pr
    // ==============================
    async update(pr_id: number, dto: UpdatePRHeaderDTO, context: any) {
        try {

            return await this.prisma.$transaction(async (tx) => {

                // ==============================
                // 1️⃣ Load existing PR + lines
                // ==============================
                const existing = await tx.pr_header.findUnique({
                    where: { pr_id }
                });

                if (!existing) {
                    throw new BadRequestException(`PR not found: ${pr_id}`);
                }

                if (!dto.lines?.length) {
                    throw new BadRequestException('PR must have at least one line');
                }

                // ==============================
                // 2️⃣ Validate status
                // ==============================
                if (existing.status !== 'DRAFT') {
                    throw new BadRequestException(
                        `PR status must be DRAFT to update`
                    );
                }

                // ==============================
                // 3️⃣ Get Tax Config
                // ==============================
                const taxConfig = await this.prTaxService.getTaxById(dto.pr_tax_code_id);
                const taxRate = new Decimal(taxConfig.tax_rate).div(100);

                // ==============================
                // 4️⃣ Recalculate lines
                // ==============================
                let headerDocSubtotal = new Decimal(0);
                let headerDocTaxTotal = new Decimal(0);
                let headerDocTotal = new Decimal(0);
                let headerDocLineDiscountTotal = new Decimal(0);

                const calculatedLines: {
                    line: UpdatePRLineDTO;
                    calc: any;
                }[] = [];

                for (const line of dto.lines) {

                    // calculate line amount
                    const calc = this.prCalculationService.calculateLineAmount({
                        qty: line.qty,
                        unitPrice: line.est_unit_price,
                        discountInput: line.line_discount_raw,
                        taxRate: Number(taxRate),
                    });

                    headerDocSubtotal = headerDocSubtotal.plus(calc.net);
                    headerDocTaxTotal = headerDocTaxTotal.plus(calc.tax);
                    headerDocTotal = headerDocTotal.plus(calc.total);
                    headerDocLineDiscountTotal =
                        headerDocLineDiscountTotal.plus(calc.discount_amount);

                    calculatedLines.push({ line, calc });
                }

                // ==============================
                // 5️⃣ Calculate Header Totals
                // ==============================
                const headerDocTotals =
                    this.prCalculationService.calculateHeaderTotals({
                        subtotal: Number(headerDocSubtotal),
                        discountInput: String(dto.pr_discount_raw),
                        taxRate: Number(taxRate),
                    });

                const headerBaseTotals =
                    this.prCalculationService.convertToBase(
                        headerDocTotals,
                        Number(dto.pr_exchange_rate),
                    );

                // ==============================
                // 6️⃣ Update Header
                // ==============================
                const header = {
                    pr_date: dto.pr_date ? new Date(dto.pr_date) : new Date(),
                    need_by_date: dto.need_by_date ? new Date(dto.need_by_date) : new Date(),
                    status: dto.status,
                    remark: dto.remark ?? null,
                    payment_term_days: dto.payment_term_days ?? null,
                    delivery_date: dto.delivery_date ? new Date(dto.delivery_date) : new Date(),
                    credit_days: dto.credit_days,
                    vendor_quote_no: dto.vendor_quote_no,
                    shipping_method: dto.shipping_method,
                    requester_name: dto.requester_name,

                    pr_exchange_rate_date: dto.pr_exchange_rate_date
                        ? new Date(dto.pr_exchange_rate_date)
                        : new Date(),

                    pr_base_currency_code: dto.pr_base_currency_code ?? null,
                    pr_quote_currency_code: dto.pr_quote_currency_code ?? null,
                    pr_exchange_rate: dto.pr_exchange_rate ?? null,

                    // ===== Totals =====
                    pr_quote_total_amount: headerDocTotals.total ?? 0,
                    pr_base_total_amount: headerBaseTotals.total ?? 0,
                    pr_tax_amount: headerBaseTotals.tax_total ?? 0,
                    pr_discount_amount: headerDocTotals.discount_amount ?? 0,
                    pr_discount_rate: headerDocTotals.total ?? 0,
                    pr_discount_raw: dto.pr_discount_raw ?? '',

                    // ===== Tax =====
                    pr_tax_rate: taxConfig.tax_rate ?? 0,

                    // ===== Relations =====
                    branch: {
                        connect: { branch_id: dto.branch_id },
                    },
                    pr_tax_code: {
                        connect: { tax_code_id: dto.pr_tax_code_id },
                    },
                    requester_user: {
                        connect: { employee_id: dto.requester_user_id },
                    },
                    ...(dto.project_id && {
                        project: {
                            connect: { project_id: dto.project_id },
                        },
                    }),
                    updated_at: new Date(),
                    project_id: dto.project_id ?? null,
                    version: { increment: 1 },
                };

                const updatedHeader = await this.updatePRHeaderRepository.update({
                    tx,
                    pr_id,
                    version: dto.version,
                    headerData: header,
                });

                // ==============================
                // 7️⃣ Sync Lines (DIFF)
                // ==============================
                // get incoming line ids
                const incomingIds = dto.lines
                    .filter(l => l.pr_line_id !== undefined)
                    .map(l => l.pr_line_id);

                // delete removed lines
                await tx.pr_line.deleteMany({
                    where: {
                        pr_id,
                        pr_line_id: { notIn: incomingIds }
                    }
                });

                // upsert lines
                for (const item of calculatedLines) {

                    const { line, calc } = item;

                    // create
                    const lineData: Prisma.pr_lineCreateInput = {

                        line_no: Number(line.line_no),
                        description: line.description,
                        location: line.location,
                        qty: Number(line.qty),
                        est_unit_price: Number(line.est_unit_price),
                        required_receipt_type: line.required_receipt_type,
                        line_discount_raw: line.line_discount_raw,

                        pr: {
                            connect: { pr_id: updatedHeader.pr_id },
                        },

                        ...(line.item_id && {
                            item: {
                                connect: { item_id: line.item_id },
                            },
                        }),

                        ...(line.warehouse_id && {
                            warehouse: {
                                connect: { warehouse_id: line.warehouse_id },
                            },
                        }),

                        uom: {
                            connect: { uom_id: line.uom_id },
                        },

                        ...(taxConfig.tax_code_id && {
                            tax_code: {
                                connect: { tax_code_id: taxConfig.tax_code_id },
                            },
                        }),

                        tax_rate: Number(taxConfig.tax_rate) || 0,
                        line_amount: Number(calc.total) || 0,
                        tax_amount: Number(calc.tax) || 0,
                        line_discount_rate: Number(calc.discount_rate) || 0,
                        line_discount_amount: Number(calc.discount_amount) || 0,
                        line_net_amount: Number(calc.net) || 0,
                    };

                    const lineDataUpdate: Prisma.pr_lineUpdateInput = {
                        line_no: Number(line.line_no),
                        description: line.description,
                        location: line.location,
                        qty: Number(line.qty),
                        est_unit_price: Number(line.est_unit_price),
                        required_receipt_type: line.required_receipt_type,
                        line_discount_raw: line.line_discount_raw,

                        pr: {
                            connect: { pr_id: updatedHeader.pr_id },
                        },

                        ...(line.item_id && {
                            item: {
                                connect: { item_id: line.item_id },
                            },
                        }),

                        ...(line.warehouse_id && {
                            warehouse: {
                                connect: { warehouse_id: line.warehouse_id },
                            },
                        }),

                        uom: {
                            connect: { uom_id: line.uom_id },
                        },

                        ...(taxConfig.tax_code_id && {
                            tax_code: {
                                connect: { tax_code_id: taxConfig.tax_code_id },
                            },
                        }),

                        tax_rate: Number(taxConfig.tax_rate) || 0,
                        line_amount: Number(calc.total) || 0,
                        tax_amount: Number(calc.tax) || 0,
                        line_discount_rate: Number(calc.discount_rate) || 0,
                        line_discount_amount: Number(calc.discount_amount) || 0,
                        line_net_amount: Number(calc.net) || 0,
                    };

                    if (line.pr_line_id) {

                        // update
                        await this.updatePRLineRepository.update({
                            tx,
                            pr_line_id: line.pr_line_id,
                            lineData: lineDataUpdate,
                        });

                    } else {

                        await this.prLineRepo.create(tx, lineData);

                    }
                }

                // ==============================
                // 8️⃣ Audit Log
                // ==============================
                await this.createAuditLogRepo.create(tx, updatedHeader, context);

                return updatedHeader;
            });

        } catch (error) {

            console.error('PR UPDATE ERROR:', error);

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Unexpected server error during PR update'
            );

        }
    }


}
