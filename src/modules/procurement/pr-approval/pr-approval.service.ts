import { Injectable } from '@nestjs/common';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { createPrApprovalDto } from './dto/creacte-pr-approval.dto';
import { createPrApprovalLineDto } from './dto/create-pr-approval-line.dto';
import { PrApprovalTaxService } from './domain/pr-approval-tax.service';
import { PrApprovalCalculationDomainService } from './domain/pr-approval-calculation.domain.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PrApprovalService {
constructor(
    private readonly documentNumberService: DocumentNumberService,
    private readonly prApprovalTaxService: PrApprovalTaxService,
    private readonly prisma: PrismaService,
    private readonly calculationDomainService: PrApprovalCalculationDomainService,
) { }

    async create(createPrApprovalDto: createPrApprovalDto, request: any) {
        return this.prisma.$transaction(async (prisma) => {

            const documentNo =
                await this.documentNumberService.generate({
                    module_code: 'AV',
                    document_type_code: 'AV',
                    branch_id: 0,
                });


            const taxConfig = await this.prApprovalTaxService.getTaxById(createPrApprovalDto.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            // 1️⃣ ดึงข้อมูล PR Lines ทั้งหมดที่เกี่ยวข้อง
            const lineIds = createPrApprovalDto.pr_approval_lines.map((l) => l.pr_line_id);
            
            const prLines = await prisma.pr_line.findMany({
                where: { pr_line_id: { in: lineIds } },
            });

            const prLineMap = new Map(prLines.map((line) => [line.pr_line_id, line]));

            const calculatedLines: {
                line: createPrApprovalLineDto;
                calc: any;
            }[] = [];

            for (const line of createPrApprovalDto.pr_approval_lines) {
                const prLine = prLineMap.get(line.pr_line_id);

                if (!prLine) {
                    throw new Error(`PR line not found: ${line.pr_line_id}`);
                }

                const lineAmount = this.calculationDomainService.calculateLine({
                    qty: line.approved_qty, // จาก approval
                    unit_price: Number(prLine.est_unit_price), // 🔥 จาก PR เท่านั้น
                    discount_expression: prLine.line_discount_raw ?? undefined, // 🔥 จาก PR
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            // const headerDocTotals = this.CalculationDomainService.calculateHeaderTotal({
            //     subtotal: netAmount.toNumber(),
            //     exchange_rate: createVQHeaderDto.exchange_rate,
            //     discount_expression: String(createVQHeaderDto.discount_expression),
            //     tax_rate: taxRate.toNumber(),
            // });




        });
    }
}
