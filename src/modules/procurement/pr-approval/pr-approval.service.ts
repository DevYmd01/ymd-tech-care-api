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

            // 4️⃣ Create Lines
            for (const { line, calc } of calculatedLines) {
                // ✅ ดึง PR line
                const prLine = await tx.pr_line.findUnique({
                    where: { pr_line_id: line.pr_line_id },
                });

                if (!prLine) {
                    throw new NotFoundException(
                        `PR line not found: ${line.pr_line_id}`
                    );
                }

                //   const prQty =
                //     typeof prLine.qty === 'number'
                //       ? prLine.qty
                //       : prLine.qty?.toNumber() ?? 0;
                const prQty = Number(prLine.qty);

                // ✅ รวมของเดิม (ก่อน insert)
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

                const newTotal = currentApproved + incomingQty;

                // 🚨 กัน over (ก่อน insert)
                // if (newTotal > prQty) {
                //   throw new BadRequestException(
                //     `Total approved (${newTotal}) exceeds required (${prQty})`
                //   );
                // }

                // ✅ ค่อย insert
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
                console.log('DEBUG STATUS:', {
                    pr_line_id: line.pr_line_id,
                    currentApproved,
                    incomingQty,
                    newTotal,
                    prQty,
                });
                // ✅ คำนวณ status จาก newTotal
                let status: 'PENDING' | 'PARTIAL' | 'APPROVED';

                if (newTotal === 0) {
                    status = 'PENDING';
                } else if (newTotal < prQty) { // หากอนุญาตให้เกินได้ สถานะตรงนี้อาจจะต้องปรับตามความเหมาะสม
                    status = 'PARTIAL';
                } else {
                    status = 'APPROVED';
                }
                console.log('DEBUG STATUS:', { status });

                // ✅ update
                await tx.pr_line.update({
                    where: { pr_line_id: line.pr_line_id },
                    data: {
                        status,
                        approved_qty: newTotal,
                    },
                });
            }


            // 5️⃣ Return result (ใช้ tx ให้ consistent)
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
    notIn: ['DRAFT', 'CANCELLED'], 
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
}