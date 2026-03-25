import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { createPrApprovalDto } from './dto/creacte-pr-approval.dto';
import { createPrApprovalLineDto } from './dto/create-pr-approval-line.dto';
import { PrApprovalTaxService } from './domain/pr-approval-tax.service';
import { PrApprovalCalculationDomainService } from './domain/pr-approval-calculation.domain.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { PRApprovalHeaderMapper } from './mapper/create-pr-approval.mapper';
import { CreatePRApprovalHeaderRepository } from './repository/create-pr-approval.repository';
import { CreatePRApprovalLineRepository } from './repository/create-pr-approval-line.repository';
import { PRApprovalLineMapper } from './mapper/create-pr-approval-line.mapper';
import { SearchPRAppointmentDto } from './dto/search-approval.dto';

@Injectable()
export class PrApprovalService {
    constructor(
        private readonly documentNumberService: DocumentNumberService,
        private readonly prApprovalTaxService: PrApprovalTaxService,
        private readonly prisma: PrismaService,
        private readonly calculationDomainService: PrApprovalCalculationDomainService,
        private readonly CreatePRApprovalHeaderRepository: CreatePRApprovalHeaderRepository,
        private readonly CreatePRApprovalLineRepository: CreatePRApprovalLineRepository,
    ) { }
    
async create(createPrApprovalDto: createPrApprovalDto, request: any) {
    return this.prisma.$transaction(async (tx) => {

        const isCancelled = createPrApprovalDto.status === 'CANCELLED';

        const documentNo = await this.documentNumberService.generate({
            module_code: 'AV',
            document_type_code: 'AV',
            branch_id: 0,
        });

        const taxConfig = await this.prApprovalTaxService.getTaxById(
            createPrApprovalDto.tax_code_id!
        );

        const taxRate = new Decimal(taxConfig.tax_rate).div(100);

        let discountAmount = new Decimal(0);
        let netAmount = new Decimal(0);
        let subtotal = new Decimal(0);

        // 1️⃣ ดึง PR Lines
        const lineIds = createPrApprovalDto.pr_approval_lines.map(
            (l) => l.pr_line_id
        );

        const prLines = await tx.pr_line.findMany({
            where: { pr_line_id: { in: lineIds } },
        });

        const prLineMap = new Map(
            prLines.map((line) => [line.pr_line_id, line])
        );

        const calculatedLines: {
            line: createPrApprovalLineDto;
            calc: any;
        }[] = [];

        for (const line of createPrApprovalDto.pr_approval_lines) {
            const prLine = prLineMap.get(line.pr_line_id);

            if (!prLine) {
                throw new NotFoundException(
                    `PR line not found: ${line.pr_line_id}`
                );
            }

            const unitPrice =
                typeof prLine.est_unit_price === 'number'
                    ? prLine.est_unit_price
                    : prLine.est_unit_price?.toNumber() ?? 0;

            const lineAmount =
                this.calculationDomainService.calculateLine({
                    qty: line.approved_qty,
                    unit_price: unitPrice,
                    discount_expression: prLine.line_discount_raw ?? undefined,
                });

            subtotal = subtotal.plus(lineAmount.subtotal);
            discountAmount = discountAmount.plus(lineAmount.discountAmount);
            netAmount = netAmount.plus(lineAmount.netAmount);

            calculatedLines.push({
                line,
                calc: lineAmount,
            });
        }

        // 2️⃣ Header
        const prHeader = await tx.pr_header.findUnique({
            where: { pr_id: createPrApprovalDto.pr_id },
        });

        if (!prHeader) {
            throw new NotFoundException(
                `PR Header not found for id: ${createPrApprovalDto.pr_id}`
            );
        }

        const exchangeRate =
            typeof prHeader.pr_exchange_rate === 'number'
                ? prHeader.pr_exchange_rate
                : prHeader.pr_exchange_rate?.toNumber() ?? 1;

        const headerDocTotals =
            this.calculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: exchangeRate,
                discount_expression: String(prHeader.pr_discount_raw ?? '0'),
                tax_rate: taxRate.toNumber(),
            });

        // 3️⃣ Create Header
        const createPRApprovalData =
            PRApprovalHeaderMapper.toPrismaCreateInput(
                createPrApprovalDto,
                documentNo,
                headerDocTotals
            );

        const createdHeader =
            await this.CreatePRApprovalHeaderRepository.create(
                tx,
                createPRApprovalData
            );

        // 4️⃣ Create Lines + Update PR Line
        for (const { line, calc } of calculatedLines) {

            const prLine = await tx.pr_line.findUnique({
                where: { pr_line_id: line.pr_line_id },
            });

            if (!prLine) {
                throw new NotFoundException(
                    `PR line not found: ${line.pr_line_id}`
                );
            }

            const prQty = Number(prLine.qty);

            const existingApproved = await tx.pr_approval_line.aggregate({
                where: {
                    pr_line_id: line.pr_line_id,
                },
                _sum: {
                    approved_qty: true,
                },
            });

            const currentApproved =
                existingApproved._sum.approved_qty?.toNumber() ?? 0;

            const incomingQty =
                typeof line.approved_qty === 'number'
                    ? line.approved_qty
                    : Number(line.approved_qty ?? 0);

            let newTotal = currentApproved;

            // ✅ ถ้าไม่ใช่ cancel → ค่อยเพิ่ม qty
            if (!isCancelled) {
                newTotal = currentApproved + incomingQty;
            }

            // ✅ Insert approval line (เก็บ log ไว้เสมอ)
            const createVQLineData =
                PRApprovalLineMapper.toPrismaCreateInput(
                    line,
                    calc,
                    createdHeader.approval_id
                );

            await this.CreatePRApprovalLineRepository.create(
                tx,
                createVQLineData
            );

            // ✅ คำนวณ status
            let status: 'PENDING' | 'PARTIAL' | 'APPROVED';

            if (newTotal === 0) {
                status = 'PENDING';
            } else if (newTotal < prQty) {
                status = 'PARTIAL';
            } else {
                status = 'APPROVED';
            }

            // ✅ update pr_line
            await tx.pr_line.update({
                where: { pr_line_id: line.pr_line_id },
                data: {
                    status,
                    approved_qty: newTotal,
                },
            });
        }

        // 5️⃣ Update PR Header status
        const prLinesUpdated = await tx.pr_line.findMany({
            where: { pr_id: createPrApprovalDto.pr_id },
        });

        const totalRequested = prLinesUpdated.reduce(
            (sum, l) => sum + Number(l.qty),
            0
        );

        const totalApproved = prLinesUpdated.reduce(
            (sum, l) => sum + Number(l.approved_qty),
            0
        );

        let headerStatus: 'PENDING' | 'PARTIAL' | 'APPROVED';

        if (totalApproved === 0) headerStatus = 'PENDING';
        else if (totalApproved < totalRequested) headerStatus = 'PARTIAL';
        else headerStatus = 'APPROVED';

        await tx.pr_header.update({
            where: { pr_id: createPrApprovalDto.pr_id },
            data: { status: headerStatus },
        });

        console.log('DEBUG PR Header status:', headerStatus);

        // 6️⃣ Return
        return tx.pr_approval.findUnique({
            where: { approval_id: createdHeader.approval_id },
            include: {
                prApprovalLines: true,
            },
        });
    });
}


    async findAll(query: SearchPRAppointmentDto) {
        const {
            page = 1,
            limit = 20,
            pr_no,
            approval_no,
            status,
            date_start,
            date_end
        } = query;

        const safeLimit = Math.min(limit, 100);
        const skip = (page - 1) * safeLimit;
        const clean = (val?: string) => val?.trim();

        const filters: Prisma.pr_approvalWhereInput[] = [];

        if (clean(approval_no)) {
            filters.push({ approval_no: { contains: clean(approval_no), mode: 'insensitive' } });
        }

        if (clean(pr_no)) {
            filters.push({
                pr: {
                    pr_no: { contains: clean(pr_no), mode: 'insensitive' }
                }
            });
        }

        if (clean(status)) {
            filters.push({ status: clean(status) });
        }

        if (date_start || date_end) {
            filters.push({
                created_at: {
                    ...(date_start && { gte: new Date(date_start) }),
                    ...(date_end && { lte: new Date(new Date(date_end).setHours(23, 59, 59, 999)) }),
                }
            });
        }

        const where: Prisma.pr_approvalWhereInput = filters.length > 0 ? { AND: filters } : {};

        const [data, total] = await Promise.all([
            this.prisma.pr_approval.findMany({
                where,
                skip,
                take: safeLimit,
                orderBy: { created_at: 'desc' },
                include: {
                    pr: { select: { pr_no: true } },
                }
            }),
            this.prisma.pr_approval.count({ where }),
        ]);

        return {
            data,
            total,
            page,
            limit: safeLimit,
            totalPages: Math.ceil(total / safeLimit),
        };
    }

    async prApprovalPending() {
        const pr = await this.prisma.pr_header.findMany({
            where: {
                status: {
                    in: ['PENDING', 'PARTIAL'],
                },
                prLines: {
                    some: {
                        status: {
                            in: ['PENDING', 'PARTIAL'],
                        },
                    },
                },
            },
            include: {
                prLines: {
                    where: {
                        status: {
                            in: ['PENDING', 'PARTIAL'],
                        },
                    },
                    include: {
                        item: true,
                        warehouse: true,
                        locationId: true,
                        uom: true,
                    },
                },
            },
        });

        if (!pr.length) {
            throw new NotFoundException(
                `ไม่พบข้อมูล PR ที่รออนุมัติ`
            );
        }

        return pr;
    }

    async findOne(approval_id: number) {
        const approval = await this.prisma.pr_approval.findUnique({
            where: { approval_id },
            include: {
                pr: true, // ดึงข้อมูล PR ตั้งต้น
                prApprovalLines: {
                    include: {
                        pr_line: { // ดึงข้อมูลบรรทัด PR ที่เชื่อมโยง
                            include: {
                                item: true,
                                uom: true,
                            }
                        }
                    }
                }
            }
        });

        if (!approval) {
            throw new NotFoundException(`ไม่พบข้อมูลรายการอนุมัติรหัส ${approval_id}`);
        }

        return approval;
    }

        async findPR(id: number) {
        const pr = await this.prisma.pr_header.findMany({
            where: {
                pr_id: id,
            },
            include: {
                prLines: {
                    where: {
                        status: {
                            in: ['PENDING', 'PARTIAL'],
                        },
                    },
                    include: {
                        item: true,
                        warehouse: true,
                        locationId: true,
                        uom: true,
                    },
                },
            },
        });

        if (!pr.length) {
            throw new NotFoundException(`ไม่พบข้อมูล PR ที่รออนุมัติ`);
        }

        // 🔥 เพิ่ม logic คำนวณ qty
        const result = pr.map((p) => {
            const lines = p.prLines.map((line) => {
                const approvedQty = line.approved_qty || 0;
                const requestedQty = line.qty || 0;

                const remaining_qty = Number(requestedQty) - Number(approvedQty);

                let computedStatus = line.status;

                if (Number(approvedQty) === 0) {
                    computedStatus = 'PENDING';
                } else if (approvedQty < requestedQty) {
                    computedStatus = 'PARTIAL';
                } else {
                    computedStatus = 'APPROVED';
                }

                return {
                    ...line,
                    approved_qty: approvedQty,
                    requested_qty: requestedQty,
                    remaining_qty,
                    computed_status: computedStatus, // 🔥 สำคัญ
                };
            });

            return {
                ...p,
                prLines: lines,
            };
        });

        return result;
    }
}