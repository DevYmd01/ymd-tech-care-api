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
}
