import { Injectable } from '@nestjs/common';
import { CreatePOHeaderDTO } from './dto/create-po-header.dto';
import { CreatePOLineDTO } from './dto/create-po-line.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePOHeaderRepository } from './repository/create-po-header.repository';
import { CreatePOLineRepository } from './repository/create-po-line.repository';
import { CreatePOHeaderMapper } from './mapper/create-po-header.mapper';
import { POLineMapper } from './mapper/create-po-line.mapper';
import { AuditService } from '@/modules/audit/audit.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { TaxService } from './domain/po-tax.domain.service';
import { VqCalculationDomainService } from './domain/po-calculation.domain.service';
import { Decimal } from '@prisma/client/runtime/library';
import { AuditLogRepository } from './repository/audit-log.repository';

@Injectable()
export class PoService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly DocumentNumberService: DocumentNumberService,
        private readonly auditService: AuditService,
        private readonly createPOHeaderRepository: CreatePOHeaderRepository,
        private readonly createPOLineRepository: CreatePOLineRepository,
        private readonly taxService: TaxService,
        private readonly vqCalculationDomainService: VqCalculationDomainService,
        private readonly auditLogRepository: AuditLogRepository,


    ) { }

    async createPOHeader(createPOHeaderDTO: CreatePOHeaderDTO, context: any) {

        return this.prismaService.$transaction(async (tx) => {

            const documentNo = await this.DocumentNumberService.generate({
                module_code: 'PO',
                document_type_code: 'PO',
                branch_id: 0,
            });

            const taxConfig = await this.taxService.getTaxById(createPOHeaderDTO.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            const calculatedLines: {
                line: CreatePOLineDTO;
                calc: any;
            }[] = [];


            for (const line of createPOHeaderDTO.po_lines) {
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

                const headerDocTotals = this.vqCalculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: createPOHeaderDTO.exchange_rate,
                    discount_expression: String(createPOHeaderDTO.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

                const createPOHeaderData = CreatePOHeaderMapper.toPrismaCreateInput(createPOHeaderDTO, documentNo, headerDocTotals);
                const createdHeader = await this.createPOHeaderRepository.create(
                    tx,
                    createPOHeaderData
                );


                for (const { line, calc } of calculatedLines) {
                    const createPOLineData =
                        POLineMapper.toPrismaCreateInput(
                            line,
                            calc,
                            createdHeader.po_header_id
                        );
                    await this.createPOLineRepository.create(
                        tx,
                        createPOLineData
                    );
                }

                await this.auditLogRepository.create(tx, createdHeader, context);

                return this.prismaService.po_header.findUnique({
                    where: { po_header_id: createdHeader.po_header_id },
                    include: {
                        poLines: true,
                    },
                });
            }

        });
    }

    
}
