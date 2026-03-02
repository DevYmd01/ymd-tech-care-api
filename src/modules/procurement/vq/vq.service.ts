import { Injectable } from '@nestjs/common';
import { CreateVQHeaderDTO } from './dto/create-vq-header.bto';
import { CreateVQLineDTO } from './dto/create-vq-line.dto';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateVQHeaderRepository } from './repository/create-vq-header.repository';
import { CreateVQLineRepository } from './repository/creat-vq-line.repository';
import { VqTaxService } from './domain/vq-tax.service';
import { Decimal } from '@prisma/client/runtime/library';
import { VqCalculationDomainService } from './domain/vq-calculation.domain.service';
import { VQHeaderMapper } from './mapper/create-vq-header.mapper';
import { VQLineMapper } from './mapper/create-vq-line.mapper';
import { PrismaService } from '@/prisma/prisma.service';



@Injectable()
export class VqService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly vqCalculationDomainService: VqCalculationDomainService,
        private readonly createVQHeaderRepository: CreateVQHeaderRepository,
        private readonly createVQLineRepository: CreateVQLineRepository,
        private readonly DocumentNumberService: DocumentNumberService,
        private readonly vqTaxService: VqTaxService,
    ) { }

    async create(createVQHeaderDto: CreateVQHeaderDTO) {

        const documentNo =
            await this.DocumentNumberService.generate({
                module_code: 'VQ',
                document_type_code: 'VQ',
                branch_id: 0,
            });

        return this.prisma.$transaction(async (tx) => {

            const taxConfig = await this.vqTaxService.getTaxById(createVQHeaderDto.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            const calculatedLines: {
                line: CreateVQLineDTO;
                calc: any;
            }[] = [];


            for (const line of createVQHeaderDto.vq_lines) {
                const lineAmount = this.vqCalculationDomainService.calculateLine({
                    qty: line.qty,
                    unit_price: line.unit_price,
                    discount_expression: line.discount_expression? String(line.discount_expression) : undefined,
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            const headerDocTotals = this.vqCalculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: createVQHeaderDto.exchange_rate,
                discount_expression: String(createVQHeaderDto.discount_expression),
                tax_rate: taxRate.toNumber(),
            });

            const createVQHeaderData = VQHeaderMapper.toPrismaCreateInput(createVQHeaderDto, documentNo, headerDocTotals);
            const createdHeader = await this.createVQHeaderRepository.create(
                tx,
                createVQHeaderData
            );

            for (const { line, calc } of calculatedLines) {
                const createVQLineData =
                    VQLineMapper.toPrismaCreateInput(
                        line,
                        calc,                              
                        createdHeader.vq_header_id
                    );
                await this.createVQLineRepository.create(
                    tx,
                    createVQLineData
                );
            }

        });

    }


}


