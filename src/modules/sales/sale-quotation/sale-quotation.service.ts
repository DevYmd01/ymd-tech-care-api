import { Injectable } from '@nestjs/common';
import { CreateSaleQuotationHeaderDto } from './dto/create-sale-quotation-header.dto';
import { CreateSaleQuotationLineDto } from './dto/create-sale-quotation-line.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { TaxService } from './domain/tax.domain.service';
import { CalculationDomainService } from './domain/calculation.domain.service';
import { CreateSaleQuotationHeaderRepository } from './repository/create-sale-quotation-header.repository';
import { CreateSaleQuotationLineRepository } from './repository/create-sale-quotation-line.repository';
import { CreateSaleQuotationHeaderMapper } from './mapper/create-sale-quotation-header.mapper';
import { CreateSaleQuotationLineMapper } from './mapper/create-sale-quotation-line.mapper';
import { diffById } from '@/common/utils';
import { PricingEngineService } from '@/modules/pricing/pricing-engine/pricing-engine.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class SaleQuotationService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly taxService: TaxService,
        private readonly calculationDomainService: CalculationDomainService,
        private readonly createSaleQuotationHeaderRepository: CreateSaleQuotationHeaderRepository,
        private readonly createSaleQuotationLineRepository: CreateSaleQuotationLineRepository,
        private readonly pricingEngineService: PricingEngineService, // Inject PricingEngineService
    ) { }

    async create(createSaleQuotationHeaderDto: CreateSaleQuotationHeaderDto, ctx: any) {
        return this.prisma.$transaction(async (tx) => {

            // สร้าง PO document number
            const documentNo = await this.documentNumberService.generate({
                module_code: 'SQ',
                document_type_code: 'SQ',
                branch_id: 0,
            });

            const taxConfig = await this.taxService.getTaxById(
                createSaleQuotationHeaderDto.tax_code_id!
            );

            const taxRate = new Prisma.Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Prisma.Decimal(0);
            let netAmount = new Prisma.Decimal(0);
            let subtotal = new Prisma.Decimal(0);

            const calculatedLines: any[] = [];

            // คำนวณ line
            for (const line of createSaleQuotationHeaderDto.sq_lines) {

                const lineAmount =
                    this.calculationDomainService.calculateLine({
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

            // คำนวณ header
            const headerDocTotals =
                this.calculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: createSaleQuotationHeaderDto.exchange_rate,
                    discount_expression: String(createSaleQuotationHeaderDto.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

            /**
             * สร้าง PO Header
             * รองรับการสร้าง PO โดยตรง ไม่จำเป็นต้องผ่าน PR, RFQ, AV, QC (FK เป็น Optional)
             */
            const createPOHeaderData =
                CreateSaleQuotationHeaderMapper.toPrismaCreateInput(
                    createSaleQuotationHeaderDto,
                    documentNo,
                    headerDocTotals
                );

            const createdHeader =
                await this.createSaleQuotationHeaderRepository.create(
                    tx,
                    createPOHeaderData
                );

            /**
             * สร้าง PO Lines
             */
            for (const { line, calc } of calculatedLines) {

                const createPOLineData =
                    CreateSaleQuotationLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        createdHeader.sq_id
                    );

                await this.createSaleQuotationLineRepository.create(
                    tx,
                    createPOLineData
                );

            }

            /**
             * Audit Log
             */
            //    await this.auditLogRepository.create(
            //        tx,
            //        createdHeader,
            //        context
            //    );

            return tx.sale_quotation_header.findUnique({
                where: { sq_id: createdHeader.sq_id },
                include: {
                    saleQuotationLines: true,
                },
            });

        });
    }

    async findOne(id: number) {

        const header = await this.prisma.sale_quotation_header.findUnique({
            where: { sq_id: id },
            include: {
                saleQuotationLines: true,
            },
        });
    }

    async findAll() {
        return this.prisma.sale_quotation_header.findMany({
            include: {
                saleQuotationLines: true,
            },
        });
    }



}