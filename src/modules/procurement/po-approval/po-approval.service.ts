import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { createPoApprovalDto } from './dto/create-po-approval.dto';
import { createPoApprovalLineDto } from './dto/create-po-line-approval.to';
import { PrismaService } from '@/prisma/prisma.service';
import { PoApprovalCalculationDomainService } from './domain/po-approval-calculation.domain.service';
import { PoApprovalTaxService } from './domain/po-approval-tax.service';
import { CreatePOApprovalHeaderRepository } from './repository/create-po-approval.repository';
import { CreatePOApprovalLineRepository } from './repository/create-po-approval-line.repository';
import { Decimal } from '@prisma/client/runtime/library';
import { PoApprovalHeaderMapper } from './mapper/create-po-approval.mapper';
import { PoApprovalLineMapper } from './mapper/create-po-approval-line.mapper';
import { SearchPoApprovalDto } from './dto/search-po-approval.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PoApprovalService {
    constructor(
        private readonly documentNumberService: DocumentNumberService,
        private readonly prisma: PrismaService,
        private readonly poApprovalCalculationService: PoApprovalCalculationDomainService,
        private readonly poApprovalTaxService: PoApprovalTaxService,
        private readonly createPOApprovalHeaderRepository: CreatePOApprovalHeaderRepository,
        private readonly createPOApprovalLineRepository: CreatePOApprovalLineRepository,
    ) {}

    async create(createPoApprovalDto: createPoApprovalDto, request?: any) {
        return this.prisma.$transaction(async (tx) => {
            const isCancelled = createPoApprovalDto.status === 'CANCELLED';

            const documentNo = await this.documentNumberService.generate({
                module_code: 'POA',
                document_type_code: 'POA',
                branch_id: 0,
            });

            const taxConfig = await this.poApprovalTaxService.getTaxById(
                createPoApprovalDto.tax_code_id!
            );

            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            // 1️⃣ ดึงข้อมูล PO Lines ที่จะอนุมัติ
            const lineIds = createPoApprovalDto.lines.map(
                (l) => l.po_line_id
            );

            const poLines = await tx.po_line.findMany({
                where: { po_line_id: { in: lineIds } },
            });

            const poLineMap = new Map(
                poLines.map((line) => [line.po_line_id, line])
            );

            const calculatedLines: {
                line: createPoApprovalLineDto;
                calc: any;
            }[] = [];

            for (const line of createPoApprovalDto.lines) {
                const poLine = poLineMap.get(line.po_line_id);

                if (!poLine) {
                    throw new NotFoundException(
                        `PO line not found: ${line.po_line_id}`
                    );
                }

                const unitPrice =
                    typeof poLine.unit_price === 'number'
                        ? poLine.unit_price
                        : (poLine.unit_price as any)?.toNumber() ?? 0;

                const lineAmount =
                    this.poApprovalCalculationService.calculateLine({
                        qty: line.approved_qty,
                        unit_price: unitPrice,
                        discount_expression: poLine.discount_expression ?? undefined,
                    });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            // 2️⃣ ดึงข้อมูล Header เพื่อคำนวณยอดสุทธิ
            const poHeader = await tx.po_header.findUnique({
                where: { po_header_id: createPoApprovalDto.po_header_id },
            });

            if (!poHeader) {
                throw new NotFoundException(
                    `PO Header not found for id: ${createPoApprovalDto.po_header_id}`
                );
            }

            const exchangeRate =
                typeof poHeader.exchange_rate === 'number'
                    ? poHeader.exchange_rate
                    : (poHeader.exchange_rate as any)?.toNumber() ?? 1;

            const headerDocTotals =
                this.poApprovalCalculationService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: exchangeRate,
                    discount_expression: String(poHeader.discount_expression ?? '0'),
                    tax_rate: taxRate.toNumber(),
                });

            // 3️⃣ สร้าง PO Approval Header
            const createPOApprovalData =
                PoApprovalHeaderMapper.toPrismaCreateInput(
                    createPoApprovalDto,
                    documentNo,
                    headerDocTotals
                );

            const createdHeader =
                await this.createPOApprovalHeaderRepository.create(
                    tx,
                    createPOApprovalData
                );

            // 4️⃣ สร้าง PO Approval Lines และอัปเดตสถานะใน po_line
            for (const { line, calc } of calculatedLines) {
                const poLine = poLineMap.get(line.po_line_id)!;
                const poQty = Number(poLine.qty);

                const existingApproved = await tx.po_approval_line.aggregate({
                    where: { po_line_id: line.po_line_id },
                    _sum: { approved_qty: true },
                });

                const currentApproved =
                    existingApproved._sum.approved_qty?.toNumber() ?? 0;

                const incomingQty =
                    typeof line.approved_qty === 'number'
                        ? line.approved_qty
                        : Number(line.approved_qty ?? 0);

                let newTotal = currentApproved;
                if (!isCancelled) {
                    newTotal = currentApproved + incomingQty;
                }

                // Insert approval line (เก็บ log ไว้เสมอ)
                const createPOApprovalLineData =
                    PoApprovalLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        createdHeader.approval_id,
                        createPoApprovalDto.status
                    );

                await this.createPOApprovalLineRepository.create(
                    tx,
                    createPOApprovalLineData
                );

                // คำนวณ status ใหม่
                let status: 'PENDING' | 'PARTIAL' | 'APPROVED';
                if (newTotal === 0) {
                    status = 'PENDING';
                } else if (newTotal < poQty) {
                    status = 'PARTIAL';
                } else {
                    status = 'APPROVED';
                }

                // Update po_line ทันที
                await tx.po_line.update({
                    where: { po_line_id: line.po_line_id },
                    data: {
                        status,
                        approved_qty: newTotal,
                    },
                });
            }

            // 5️⃣ Update สถานะ PO Header
            const poLinesUpdated = await tx.po_line.findMany({
                where: { po_header_id: createPoApprovalDto.po_header_id },
            });

            const totalRequested = poLinesUpdated.reduce(
                (sum, l) => sum + Number(l.qty),
                0
            );

            const totalApproved = poLinesUpdated.reduce(
                (sum, l) => sum + Number((l as any).approved_qty ?? 0),
                0
            );

            let headerStatus: 'PENDING' | 'PARTIAL' | 'APPROVED';
            if (totalApproved === 0) headerStatus = 'PENDING';
            else if (totalApproved < totalRequested) headerStatus = 'PARTIAL';
            else headerStatus = 'APPROVED';

            await tx.po_header.update({
                where: { po_header_id: createPoApprovalDto.po_header_id },
                data: { status: headerStatus },
            });

            // 6️⃣ Return Output
            return tx.po_approval.findUnique({
                where: { approval_id: createdHeader.approval_id },
                include: {
                    poApprovalLines: true,
                },
            });
        });
    }

    async poApprovalPending() {
        const pos = await this.prisma.po_header.findMany({
            where: {
                // ค้นหา PO ที่มีสถานะรออนุมัติ หรือ อนุมัติไปบางส่วน
                status: {
                    in: ['PENDING', 'PARTIAL'],
                },
            },
            include: {
                poLines: {
                    // ดึงรายการทั้งหมดใน PO นั้นๆ มาเพื่อคำนวณ
                    include: {
                        item: true,
                        uom: true,
                    },
                },
                vendor: true,
                branch: true,
                createdPoHeaders: { // ผูู้สร้าง PO
                    select: {
                        employee_id: true,
                        employee_fullname: true,
                    }
                },
            },
            orderBy: {
                po_date: 'desc',
            },
        });

        // ไม่โยน Error แต่คืนค่าเป็น Array ว่าง ถ้าไม่เจอข้อมูล
        if (!pos.length) {
            return [];
        }

        // เพิ่มข้อมูลคำนวณ qty ที่ยังไม่ได้อนุมัติ เพื่อให้ Frontend ใช้งานง่ายขึ้น
        const result = pos.map((p) => {
            const lines = p.poLines.map((line) => {
                const approvedQty = new Decimal((line as any).approved_qty ?? 0);
                const requestedQty = new Decimal(line.qty);

                const remaining_qty = requestedQty.minus(approvedQty);

                return {
                    ...line,
                    approved_qty: approvedQty.toNumber(),
                    requested_qty: requestedQty.toNumber(),
                    remaining_qty: remaining_qty.toNumber(),
                };
            });

            return {
                ...p,
                poLines: lines,
            };
        });

        return result;
    }

    async findAll(query: SearchPoApprovalDto) {
        const {
            page = 1,
            limit = 20,
            po_no,
            approval_no,
            status,
            date_start,
            date_end
        } = query;

        const safeLimit = Math.min(limit, 100);
        const skip = (page - 1) * safeLimit;
        const clean = (val?: string) => val?.trim();

        const filters: Prisma.po_approvalWhereInput[] = [];

        if (clean(approval_no)) {
            filters.push({ approval_no: { contains: clean(approval_no), mode: 'insensitive' } });
        }

        if (clean(po_no)) {
            filters.push({
                poHeader: {
                    po_no: { contains: clean(po_no), mode: 'insensitive' }
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

        const where: Prisma.po_approvalWhereInput = filters.length > 0 ? { AND: filters } : {};

        const [data, total] = await Promise.all([
            this.prisma.po_approval.findMany({
                where,
                skip,
                take: safeLimit,
                orderBy: { created_at: 'desc' },
                include: {
                    poHeader: { select: { po_no: true } },
                }
            }),
            this.prisma.po_approval.count({ where }),
        ]);

        return {
            data,
            total,
            page,
            limit: safeLimit,
            totalPages: Math.ceil(total / safeLimit),
        };
    }

    async findOne(approval_id: number) {
        const approval = await this.prisma.po_approval.findUnique({
            where: { approval_id },
            include: {
                poHeader: true, // ดึงข้อมูล PO ตั้งต้น
                poApprovalLines: {
                    include: {
                        po_line: { // ดึงข้อมูลบรรทัด PO ที่เชื่อมโยง
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
}
