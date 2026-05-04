import { Injectable } from '@nestjs/common';
import { CreateSaleOrderApprovalHeaderDto } from './dto/create-sale-order-ap-header.dto'; 
import { CreateSaleOrderApprovalLineDto } from './dto/create-sale-order-ap-line.dto';  
import { CreateSaleOrderApprovalHeaderMapper } from './mapper/create-sale-order-ap-header.mapper';
import { CreateSaleOrderApprovalHeaderRepository } from './repository/create-sale-order-ap-header.repository';
import { CreateSaleOrderApprovalLineMapper } from './mapper/create-sale-order-ap-line.mapper';
import { CreateSaleOrderApprovalLineRepository } from './repository/create-sale-order-ap-line.repository';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { PrismaService } from '@/prisma/prisma.service';    
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';


@Injectable()
export class SaleOrderApprovalService {
    constructor(
        private readonly createSaleOrderApprovalHeaderRepository: CreateSaleOrderApprovalHeaderRepository,
        private readonly createSaleOrderApprovalLineRepository: CreateSaleOrderApprovalLineRepository,
        // Mappers are typically static methods, so injecting them might not be necessary if only static methods are used.
        // private readonly createSaleOrderApprovalHeaderMapper: CreateSaleOrderApprovalHeaderMapper,
        // private readonly createSaleOrderApprovalLineMapper: CreateSaleOrderApprovalLineMapper,
        private readonly taxService: TaxService,
        private readonly calculationDomainService: CalculationDomainService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly prisma: PrismaService
    ) {}

async create(createDto: CreateSaleOrderApprovalHeaderDto) {
    return this.prisma.$transaction(async (tx) => {

        const isCancelled =
            createDto.status === 'REJECTED' ||
            createDto.status === 'CANCELLED';

        // 🔹 สร้าง document
        const documentNo = await this.documentNumberService.generate({
            module_code: 'SOA',
            document_type_code: 'SOA',
            branch_id: 0,
        });

        // 🔹 1. tax
        let taxRate = new Prisma.Decimal(0);
        if (createDto.tax_code_id) {
            const tax = await this.taxService.getTaxById(createDto.tax_code_id);
            taxRate = new Prisma.Decimal(tax.tax_rate).div(100);
        }

        // 🔹 IMPORTANT (เหมือน SQ)
        let subtotal = new Prisma.Decimal(0);
        let discountAmount = new Prisma.Decimal(0);
        let netAmount = new Prisma.Decimal(0);

        // 🔹 2. ดึง SO lines
        const lineIds = createDto.CreateSaleOrderApprovalLineDtos.map(
            (l) => l.so_line_id
        );

        const soLines = await tx.sale_order_line.findMany({
            where: { so_line_id: { in: lineIds } },
        });

        const soLineMap = new Map(
            soLines.map((line) => [line.so_line_id, line])
        );

        // 🔹 FIX never[]
        const calculatedLines: {
            line: CreateSaleOrderApprovalLineDto;
            calc: {
                subtotal: Prisma.Decimal;
                discountAmount: Prisma.Decimal;
                netAmount: Prisma.Decimal;
            };
        }[] = [];

        // 🔹 3. คำนวณ line (เหมือน SQ)
        for (const line of createDto.CreateSaleOrderApprovalLineDtos) {
            const soLine = soLineMap.get(line.so_line_id);

            if (!soLine) {
                throw new Error(`SO line not found: ${line.so_line_id}`);
            }

            const unitPrice =
                typeof soLine.unit_price === 'number'
                    ? soLine.unit_price
                    : (soLine.unit_price as any)?.toNumber() ?? 0;

            const lineAmount =
                this.calculationDomainService.calculateLine({
                    qty: line.approved_qty,
                    unit_price: unitPrice,
                    discount_expression:
                        soLine.discount_expression ?? undefined,
                });

            subtotal = subtotal.plus(lineAmount.subtotal);
            discountAmount = discountAmount.plus(lineAmount.discountAmount);
            netAmount = netAmount.plus(lineAmount.netAmount);

            calculatedLines.push({
                line,
                calc: lineAmount,
            });
        }

        // 🔹 4. header
        const soHeader = await tx.sale_order_header.findUnique({
            where: { so_id: createDto.so_id },
        });

        if (!soHeader) {
            throw new Error(`SO Header not found: ${createDto.so_id}`);
        }

        const exchangeRate =
            typeof soHeader.exchange_rate === 'number'
                ? soHeader.exchange_rate
                : (soHeader.exchange_rate as any)?.toNumber() ?? 1;

        const headerTotals =
            this.calculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: exchangeRate,
                discount_expression: String(
                    soHeader.discount_expression ?? '0'
                ),
                tax_rate: taxRate.toNumber(),
            });

        // 🔹 5. create header
        const headerData =
            CreateSaleOrderApprovalHeaderMapper.toPrismaCreateInput(
                createDto,
                documentNo,
                headerTotals
            );

        const createdHeader =
            await this.createSaleOrderApprovalHeaderRepository.create(
                tx,
                headerData
            );

        // 🔹 6. create line + update SO line (เหมือน SQ)
        for (const { line, calc } of calculatedLines) {
            const soLine = soLineMap.get(line.so_line_id)!;
            const soQty = Number(soLine.qty);

            const existingApproved =
                await tx.sale_order_approval_line.aggregate({
                    where: { so_line_id: line.so_line_id },
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

            // 🔹 create line
            const lineData =
                CreateSaleOrderApprovalLineMapper.toPrismaCreateInput(
                    line,
                    createdHeader.so_approval_id,
                    calc
                );

            await this.createSaleOrderApprovalLineRepository.create(
                tx,
                lineData
            );

            // 🔹 calc status
            let status: 'PENDING' | 'PARTIAL' | 'APPROVED' | 'REJECTED';

            if (isCancelled) {
                if (newTotal === 0) status = 'REJECTED';
                else if (newTotal < soQty) status = 'PARTIAL';
                else status = 'APPROVED';
            } else {
                if (newTotal === 0) status = 'PENDING';
                else if (newTotal < soQty) status = 'PARTIAL';
                else status = 'APPROVED';
            }

            // 🔹 update SO line
            await tx.sale_order_line.update({
                where: { so_line_id: line.so_line_id },
                data: {
                    approved_qty: newTotal,
                    status,
                },
            });
        }

        // 🔹 7. update SO header
        const soHeaderUpdated = await tx.sale_order_header.findUnique({
            where: { so_id: createDto.so_id },
            include: { saleOrderLines: true },
        });

        if (soHeaderUpdated) {
            const totalRequested =
                soHeaderUpdated.saleOrderLines.reduce(
                    (sum, l) => sum + Number(l.qty),
                    0
                );

            const totalApproved =
                soHeaderUpdated.saleOrderLines.reduce(
                    (sum, l) =>
                        sum + Number((l as any).approved_qty ?? 0),
                    0
                );

            let headerStatus:
                | 'PENDING'
                | 'PARTIAL'
                | 'APPROVED'
                | 'REJECTED';

            if (isCancelled) {
                if (totalApproved === 0) headerStatus = 'REJECTED';
                else if (totalApproved < totalRequested)
                    headerStatus = 'PARTIAL';
                else headerStatus = 'APPROVED';
            } else {
                if (totalApproved === 0) headerStatus = 'PENDING';
                else if (totalApproved < totalRequested)
                    headerStatus = 'PARTIAL';
                else headerStatus = 'APPROVED';
            }

            await tx.sale_order_header.update({
                where: { so_id: createDto.so_id },
                data: { status: headerStatus },
            });
        }

        // 🔹 8. return
        return tx.sale_order_approval_header.findUnique({
            where: { so_approval_id: createdHeader.so_approval_id },
            include: { saleOrderApprovalLines: true },
        });
    });
}

async findAll() {
    return this.prisma.sale_order_approval_header.findMany({
        include: { saleOrderApprovalLines: true },
    }); 
}

async soApprovalPending() {
    return this.prisma.sale_order_header.findMany({
        where: {
                status: {
                    in: ['PENDING', 'PARTIAL'],
                },
            },
        include: { saleOrderLines: true },
    });
}

}
