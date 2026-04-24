import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateSaleQuotationHeaderDto } from './dto/create-sale-quotation-header.dto';
import { CreateSaleQuotationLineDto } from './dto/create-sale-quotation-line.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { CreateSaleQuotationHeaderRepository } from './repository/create-sale-quotation-header.repository';
import { CreateSaleQuotationLineRepository } from './repository/create-sale-quotation-line.repository';
import { CreateSaleQuotationHeaderMapper } from './mapper/create-sale-quotation-header.mapper';
import { CreateSaleQuotationLineMapper } from './mapper/create-sale-quotation-line.mapper';
import { diffById } from '@/common/utils';
import { PricingEngineService } from '@/modules/pricing/pricing-engine/pricing-engine.service';
import { Prisma } from '@prisma/client';
import { UpdateSaleQuotationHeaderMapper } from './mapper/update-sale-quotation-header.mapper';
import { UpdateSaleQuotationHeaderRepository } from './repository/update-sale-quotation-header.repository';
import { UpdateSaleQuotationLineMapper } from './mapper/update-sale-quotation-line.mapper';
import { UpdateSaleQuotationLineRepository } from './repository/update-sale-quotation-line.repository';
import { UpdateSaleQuotationHeaderDto } from './dto/update-sale-quotation-header.dto';
import { UpdateSaleQuotationLineDto } from './dto/update-sale-quotation-line.dto';


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
        private readonly updateSaleQuotationHeaderRepository: UpdateSaleQuotationHeaderRepository,
        private readonly updateSaleQuotationLineRepository: UpdateSaleQuotationLineRepository
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

    async update(id: number, updateSaleQuotationDto: UpdateSaleQuotationHeaderDto) {
        return this.prisma.$transaction(async (tx) => {
            // 1. ค้นหา Header เดิมเพื่อเช็คการมีอยู่
            const existingHeader = await tx.sale_quotation_header.findUnique({
                where: { sq_id: id },
                include: { saleQuotationLines: true } as any, // as any สำรองไว้กรณี Prisma ตั้งชื่อ relation ไม่ตรงกับ Type
            });

            if (!existingHeader) {
                throw new BadRequestException(`Sale Quotation with ID ${id} not found`);
            }

            // 2. ดึงข้อมูลภาษี
            const taxConfig = await this.taxService.getTaxById(
                updateSaleQuotationDto.tax_code_id
            );
            const taxRate = new Prisma.Decimal(taxConfig.tax_rate).div(100);

            let subtotal = new Prisma.Decimal(0);
            let discountAmount = new Prisma.Decimal(0);
            let netAmount = new Prisma.Decimal(0);

            const calculatedLines: {
                line: UpdateSaleQuotationLineDto;
                calc: any;
            }[] = [];

            // 3. คำนวณแต่ละบรรทัดก่อน
            for (const line of updateSaleQuotationDto.sq_lines || []) {
                const lineAmount = this.calculationDomainService.calculateLine({
                    qty: line.qty,
                    unit_price: line.unit_price,
                    discount_expression: line.discount_expression
                        ? String(line.discount_expression)
                        : undefined,
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({ line, calc: lineAmount });
            }

            // 4. คำนวณ Header Totals
            const headerDocTotals = this.calculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: updateSaleQuotationDto.exchange_rate,
                discount_expression: updateSaleQuotationDto.discount_expression
                    ? String(updateSaleQuotationDto.discount_expression)
                    : undefined,
                tax_rate: taxRate.toNumber(),
            });

            // 5. อัปเดต Header
            const updateHeaderData = UpdateSaleQuotationHeaderMapper.toPrismaUpdateInput(
                updateSaleQuotationDto,
                headerDocTotals
            );
            await this.updateSaleQuotationHeaderRepository.update(tx, updateHeaderData, id);

            // 6. ใช้ diffById จัดการกับรายการเพิ่ม-ลบ-แก้ไขบรรทัด (sq_lines)
            const existingLines = (existingHeader as any).saleQuotationLines || [];
            const diff = diffById(
                existingLines,
                updateSaleQuotationDto.sq_lines || [],
                'sq_line_id'
            );

            // 7. ลบรายการที่ถูกเอาออก (Delete)
            if (diff.toDelete.length > 0) {
                await tx.sale_quotation_line.deleteMany({
                    where: {
                        sq_line_id: { in: diff.toDelete.map((l: any) => l.sq_line_id) },
                    },
                });
            }

            // 8. อัปเดตรายการเดิม (Update)
            for (const line of diff.toUpdate) {
                const calcObj = calculatedLines.find(l => l.line.sq_line_id === line.sq_line_id)?.calc;
                if (!calcObj) continue;
                
                const updateLineData = UpdateSaleQuotationLineMapper.toPrismaUpdateInput(line, calcObj, id);
                await this.updateSaleQuotationLineRepository.update(tx, updateLineData, line.sq_line_id!);
            }

            // 9. สร้างรายการใหม่ (Create)
            for (const line of diff.toCreate) {
                const calcObj = calculatedLines.find(l => l.line === line)?.calc;
                if (!calcObj) continue;

                const createLineData = CreateSaleQuotationLineMapper.toPrismaCreateInput(line as any, calcObj, id);
                await this.createSaleQuotationLineRepository.create(tx, createLineData);
            }

            // 10. ส่งคืนข้อมูล Sale Quotation ที่ทำการอัปเดตเรียบร้อยแล้ว
            return tx.sale_quotation_header.findUnique({
                where: { sq_id: id },
                include: {
                    saleQuotationLines: true,
                },
            });
        });
    }





}