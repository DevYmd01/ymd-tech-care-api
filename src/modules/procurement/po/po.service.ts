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
import { UpdatePOHeaderDTO } from './dto/update-po-header.dto';
import { UpdatePOLineDTO } from './dto/update-po-line.dto';
import { UpdatePOHeaderMapper } from './mapper/update-po-header.mapper';
import { UpdatePOLineMapper } from './mapper/update-po-line.mapper';
import { UpdatePOHeaderRepository } from './repository/update-po-header.repository';
import { UpdatePOLineRepository } from './repository/update-po-line.repository';
import { diffById } from '@/common/utils';
import { CreatePRFromPOHeaderMapper as PrCreatePOHeaderMapper } from '../pr/mapper/create-pr-from-po.mapper';
import { PRHeaderRepository } from '../pr/repositories/create-pr-header.repository';

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
        private readonly updatePOHeaderRepository: UpdatePOHeaderRepository,
        private readonly updatePOLineRepository: UpdatePOLineRepository,
        private readonly PRHeaderRepository: PRHeaderRepository,

    ) { }

    async createPOHeader(createPOHeaderDTO: CreatePOHeaderDTO, context: any) {

        return this.prismaService.$transaction(async (tx) => {

            // สร้าง PO document number
            const documentNo = await this.DocumentNumberService.generate({
                module_code: 'PO',
                document_type_code: 'PO',
                branch_id: 0,
            });

            const taxConfig = await this.taxService.getTaxById(
                createPOHeaderDTO.tax_code_id!
            );

            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            const calculatedLines: any[] = [];

            // คำนวณ line
            for (const line of createPOHeaderDTO.po_lines) {

                const lineAmount =
                    this.vqCalculationDomainService.calculateLine({
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
                this.vqCalculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: createPOHeaderDTO.exchange_rate,
                    discount_expression: String(createPOHeaderDTO.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

            /**
             * ตรวจสอบ PR
             */
            let prId = createPOHeaderDTO.pr_id;

            if (!prId) {

                const prDocumentNo = await this.DocumentNumberService.generate({
                    module_code: 'PR',
                    document_type_code: 'PR',
                    branch_id: 0,
                });

                const prHeaderData =
                    PrCreatePOHeaderMapper.toPrismaCreateInput(
                        createPOHeaderDTO,
                        prDocumentNo,
                        headerDocTotals
                    );

                const createdPR = await this.PRHeaderRepository.create(
                    tx,
                    prHeaderData
                );

                prId = createdPR.pr_id;
            }

            /**
             * สร้าง PO Header
             */
            const createPOHeaderData =
                CreatePOHeaderMapper.toPrismaCreateInput(
                    createPOHeaderDTO,
                    documentNo,
                    headerDocTotals,
                    prId
                );

            const createdHeader =
                await this.createPOHeaderRepository.create(
                    tx,
                    createPOHeaderData
                );

            /**
             * สร้าง PO Lines
             */
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

            /**
             * Audit Log
             */
            await this.auditLogRepository.create(
                tx,
                createdHeader,
                context
            );

            return tx.po_header.findUnique({
                where: { po_header_id: createdHeader.po_header_id },
                include: {
                    poLines: true,
                },
            });

        });

    }


    async updatePO(
        id: number,
        updatePOHeaderDto: UpdatePOHeaderDTO,
        context: any,
    ) {
        return this.prismaService.$transaction(async (tx) => {

            // 1️⃣ หา header เดิม
            const existingHeader = await tx.po_header.findUnique({
                where: { po_header_id: id },
                include: { poLines: true },
            });

            if (!existingHeader) {
                throw new Error('PO not found');
            }

            // 2️⃣ tax config
            const taxConfig = await this.taxService.getTaxById(updatePOHeaderDto.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let subtotal = new Decimal(0);
            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);

            const calculatedLines: {
                line: UpdatePOLineDTO;
                calc: any;
            }[] = [];

            // 3️⃣ คำนวณ line ใหม่ทั้งหมด
            for (const line of updatePOHeaderDto.po_lines) {
                const lineAmount = this.vqCalculationDomainService.calculateLine({
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

            // 4️⃣ คำนวณ header total ใหม่
            const headerTotals =
                this.vqCalculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: updatePOHeaderDto.exchange_rate,
                    discount_expression: String(updatePOHeaderDto.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

            // 5️⃣ update header
            const updateHeaderData =
                UpdatePOHeaderMapper.toPrismaUpdateInput(updatePOHeaderDto, headerTotals);

            const updatedHeader =
                await this.updatePOHeaderRepository.update(
                    tx,
                    id,
                    updateHeaderData,
                );

            // 6️⃣ diff lines
            const diff = diffById(
                existingHeader.poLines,
                updatePOHeaderDto.po_lines,
                'po_line_id',
            );

            // 7️⃣ delete
            for (const line of diff.toDelete) {
                await tx.po_line.delete({
                    where: { po_line_id: line.po_line_id },
                });
            }

            // 8️⃣ update
            for (const line of diff.toUpdate) {
                const calc = calculatedLines.find(
                    (l) => l.line.po_line_id === line.po_line_id,
                )?.calc;

                const updateLineData =
                    UpdatePOLineMapper.toPrismaUpdateInput(line, calc, updatedHeader.po_header_id);

                if (!line.po_line_id) {
                    throw new Error('po_line_id is required for update');
                }

                await this.updatePOLineRepository.update(
                    tx,
                    line.po_line_id,
                    updateLineData,
                );
            }

            // 9️⃣ create
            for (const line of diff.toCreate) {
                const calc = calculatedLines.find(
                    (l) => !l.line.po_line_id && l.line === line,
                )?.calc;

                const createLineData =
                    POLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        updatedHeader.po_header_id,
                    );

                await this.createPOLineRepository.create(
                    tx,
                    createLineData,
                );
            }

            // 🔟 audit
            await this.auditLogRepository.update(tx, updatedHeader, context);

            return tx.po_header.findUnique({
                where: { po_header_id: id },
                include: {
                    poLines: true,
                },
            });
        });
    }

    findAll() {
        return this.prismaService.po_header.findMany({

        });
    }

    findOne(id: number) {
        return this.prismaService.po_header.findUnique({
            where: { po_header_id: id },
            include: {
                poLines: true,
            },
        });
    }


    findPRWithoutQC() {
        return this.prismaService.pr_header.findMany({
            where: {
                poHeaders: {
                    none: {},
                },
                qcHeaders: {
                    some: {},
                },
                status: 'APPROVED',
            },
            include: {
                poHeaders: true,
                qcHeaders: {
                    include: {
                        winningVq: {
                            include: {
                                vendor: true,
                                vqLines: true,
                            },
                        },
                    },
                }
            }
        });
    }

    findAllForTable(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;
        const rows = this.prismaService.po_header.findMany({
            include: {
                pr: {
                    select: {
                        pr_id: true,
                        pr_no: true,
                    },
                
                },
                poLines: true,
            },
            skip,
            take: pageSize, 
        });

        const total = this.prismaService.po_header.count();

        return Promise.all([rows, total]).then(([prs, total]) => {
            return { data: prs, total, page, pageSize };
        });    }


    async approve(po_id: number) {
        return this.prismaService.$transaction(async (tx) => {
            const updated = await tx.po_header.update({
                where: { po_header_id: po_id },
                data: {
                    status: 'APPROVED',
                },
            });
        });
    }
    

}
