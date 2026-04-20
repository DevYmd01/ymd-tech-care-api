import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateHeaderMapper } from './mapper/create-header.mapper';
import { CreateHeaderRepository } from './repository/create-header.repository';
import { CreateLineMapper } from './mapper/create-line.mapper';
import { CreateLineRepository } from './repository/create-line.repository';
import { TaxService } from './domain/tax.domain.service';
import { CalculationDomainService } from './domain/calculation.domain.service';
import { diffById } from '@/common/utils';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateHeaderDto } from './dto/create-header.dto';
import { CreateLineDto } from './dto/create-line.dto';

@Injectable()
export class SaleQuotationApprovalService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly taxService: TaxService,
        private readonly calculationDomainService: CalculationDomainService,
        private readonly createHeaderMapper: CreateHeaderMapper,
        private readonly createHeaderRepository: CreateHeaderRepository,
        private readonly createLineMapper: CreateLineMapper,
        private readonly createLineRepository: CreateLineRepository,
        private readonly documentNumberService: DocumentNumberService
    ) { }

    async create(createHeaderDto: CreateHeaderDto, ctx: any) {
        return this.prisma.$transaction(async (tx) => {
            const isCancelled = createHeaderDto.status === 'REJECTED' || createHeaderDto.status === 'CANCELLED';

            // สร้าง AQ document number
            const documentNo = await this.documentNumberService.generate({
                module_code: 'AQ',
                document_type_code: 'AQ',
                branch_id: 0,
            });

            // 1. ดึงข้อมูลภาษี
            let taxRate = new Decimal(0);
            if (createHeaderDto.tax_code_id) {
                const taxConfig = await this.taxService.getTaxById(createHeaderDto.tax_code_id);
                taxRate = new Decimal(taxConfig.tax_rate).div(100);
            }

            let subtotal = new Decimal(0);
            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);

            // 2. ดึงข้อมูล SQ Lines ที่จะอนุมัติ
            const lineIds = createHeaderDto.aq_lines.map((l) => l.sq_line_id);

            const sqLines = await tx.sale_quotation_line.findMany({
                where: { sq_line_id: { in: lineIds } },
            });

            const sqLineMap = new Map(sqLines.map((line) => [line.sq_line_id, line]));

            const calculatedLines: {
                line: CreateLineDto;
                calc: any;
            }[] = [];

            // 3. คำนวณแต่ละบรรทัด (Lines)
            for (const line of createHeaderDto.aq_lines) {
                const sqLine = sqLineMap.get(line.sq_line_id);

                if (!sqLine) {
                    throw new NotFoundException(`Sale Quotation line not found: ${line.sq_line_id}`);
                }

                const unitPrice =
                    typeof sqLine.unit_price === 'number'
                        ? sqLine.unit_price
                        : (sqLine.unit_price as any)?.toNumber() ?? 0;

                const lineAmount = this.calculationDomainService.calculateLine({
                    qty: line.approved_qty,
                    unit_price: unitPrice,
                    discount_expression: sqLine.discount_expression ?? undefined,
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            // 4. ดึงข้อมูล Header เพื่อใช้คำนวณยอดสุทธิ
            const sqHeader = await tx.sale_quotation_header.findUnique({
                where: { sq_id: createHeaderDto.sq_id },
            });

            if (!sqHeader) {
                throw new NotFoundException(`Sale Quotation Header not found for id: ${createHeaderDto.sq_id}`);
            }

            const exchangeRate =
                typeof sqHeader.exchange_rate === 'number'
                    ? sqHeader.exchange_rate
                    : (sqHeader.exchange_rate as any)?.toNumber() ?? 1;

            const headerDocTotals = this.calculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: exchangeRate,
                discount_expression: String(sqHeader.discount_expression ?? '0'),
                tax_rate: taxRate.toNumber(),
            });

            // 5. สร้าง Sale Quotation Approval Header
            const createAQHeaderData = CreateHeaderMapper.toPrismaCreateInput(
                createHeaderDto,
                documentNo,
                headerDocTotals
            );

            const createdHeader = await this.createHeaderRepository.create(
                tx,
                createAQHeaderData
            );

            // 6. สร้าง Approval Lines และอัปเดตสถานะใน SQ Line
            for (const { line, calc } of calculatedLines) {
                const sqLine = sqLineMap.get(line.sq_line_id)!;
                const sqQty = Number(sqLine.qty);

                const existingApproved = await tx.sale_quotation_approval_line.aggregate({
                    where: { sq_line_id: line.sq_line_id },
                    _sum: { approved_qty: true },
                });

                const currentApproved = existingApproved._sum.approved_qty?.toNumber() ?? 0;

                const incomingQty =
                    typeof line.approved_qty === 'number'
                        ? line.approved_qty
                        : Number(line.approved_qty ?? 0);

                let newTotal = currentApproved;
                if (!isCancelled) {
                    newTotal = currentApproved + incomingQty;
                }

                // Insert approval line (เพื่อเก็บ Log)
                const createAQLineData = CreateLineMapper.toPrismaCreateInput(
                    line,
                    calc,
                    (createdHeader as any).aq_id
                );

                await this.createLineRepository.create(
                    tx,
                    createAQLineData
                );

                // คำนวณ status ของบรรทัด SQ Line ใหม่
                let status: 'PENDING' | 'PARTIAL' | 'APPROVED' | 'REJECTED';
                if (isCancelled) {
                    if (newTotal === 0) status = 'REJECTED';
                    else if (newTotal < sqQty) status = 'PARTIAL';
                    else status = 'APPROVED';
                } else {
                    if (newTotal === 0) status = 'PENDING';
                    else if (newTotal < sqQty) status = 'PARTIAL';
                    else status = 'APPROVED';
                }

                // Update SQ line ทันที
                await tx.sale_quotation_line.update({
                    where: { sq_line_id: line.sq_line_id },
                    data: {
                        status,
                        approved_qty: newTotal,
                    },
                });
            }

            // 7. Update สถานะของ SQ Header โดยอิงจากจำนวนรวมแต่ละบรรทัด
            const sqHeaderUpdated = await tx.sale_quotation_header.findUnique({
                where: { sq_id: createHeaderDto.sq_id },
                include: { saleQuotationLines: true },
            });

            if (sqHeaderUpdated) {
                const totalRequested = sqHeaderUpdated.saleQuotationLines.reduce(
                    (sum, l) => sum + Number(l.qty),
                    0
                );

                const totalApproved = sqHeaderUpdated.saleQuotationLines.reduce(
                    (sum, l) => sum + Number((l as any).approved_qty ?? 0),
                    0
                );

                let headerStatus: 'PENDING' | 'PARTIAL' | 'APPROVED' | 'REJECTED';
                if (isCancelled) {
                    if (totalApproved === 0) headerStatus = 'REJECTED';
                    else if (totalApproved < totalRequested) headerStatus = 'PARTIAL';
                    else headerStatus = 'APPROVED';
                } else {
                    if (totalApproved === 0) headerStatus = 'PENDING';
                    else if (totalApproved < totalRequested) headerStatus = 'PARTIAL';
                    else headerStatus = 'APPROVED';
                }

                await tx.sale_quotation_header.update({
                    where: { sq_id: createHeaderDto.sq_id },
                    data: { status: headerStatus },
                });
            }

            // 8. Return ข้อมูล Sale Quotation Approval Header กลับให้ Client
            return tx.sale_quotation_approval_header.findUnique({
                where: { aq_id: (createdHeader as any).aq_id }
            });
        });
    }



    async sqApprovalPending() {
        return this.prisma.sale_quotation_header.findMany({
            where: {
                status: {
                    in: ['PENDING', 'PARTIAL'],
                },
            },
            include: {
                customer: true,
                branch: true,
                saleQuotationLines: {
                    where: {
                        status: {
                            in: ['PENDING', 'PARTIAL'],
                        },
                    },
                    include: {
                        item: true,
                        uom: true,
                    },
                },
            },
            orderBy: {
                sq_id: 'desc',
            },
        });
    }

    async findPendingApproval(id: number) {
        return this.prisma.sale_quotation_header.findUnique({
            where: {
                sq_id: id,
                status: {
                    in: ['PENDING', 'PARTIAL'],
                },
            },
            include: {
                customer: true,
                branch: true,
                saleQuotationLines: {
                    where: {
                        status: {
                            in: ['PENDING', 'PARTIAL'],
                        },
                    },
                    include: {
                        item: true,
                        uom: true,
                    },
                },
            },
        });
    }


}
