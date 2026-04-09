import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePriceListHeaderRepository } from './repository/create-price-list-header.repository';
import { CreatePriceListLineRepository } from './repository/create-price-list-line.repository';
import { CreatePriceListHeaderMapper } from './mapper/create-price-list-header.mapper';
import { CreatePriceListLineMapper } from './mapper/create-price-list-line.mapper';
import { CreatePriceListHeaderDto } from './dto/create-price-list-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscountDomainService } from './domain/calculation.domain.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PriceListService {
    constructor(
        private readonly createPriceListHeaderRepository: CreatePriceListHeaderRepository,
        private readonly discountDomainService: DiscountDomainService,
        private readonly createPriceListLineRepository: CreatePriceListLineRepository,
        private readonly prisma: PrismaService
    ) { }

    async create(dto: CreatePriceListHeaderDto) {
        return this.prisma.$transaction(async (tx) => {

            // 🔥 1. Validate input
            if (!dto.price_list_lines?.length) {
                throw new BadRequestException('Price list must have at least 1 line');
            }

            // 🔥 2. Prepare totals
            let subtotal = new Prisma.Decimal(0);
            let discountAmount = new Prisma.Decimal(0);
            let netAmount = new Prisma.Decimal(0);

            const duplicateCheck = new Set();

            // 🔥 เก็บผล calculation ไว้ใช้ซ้ำ
            const calculatedLines: {
                line: any;
                calc: {
                    subtotal: Prisma.Decimal;
                    discountAmount: Prisma.Decimal;
                    netAmount: Prisma.Decimal;
                };
            }[] = [];

            for (const line of dto.price_list_lines) {
                const key = `${line.item_id}_${line.uom_id}`;

                // ❌ duplicate
                if (duplicateCheck.has(key)) {
                    throw new BadRequestException(`Duplicate item + uom: ${key}`);
                }
                duplicateCheck.add(key);

                // ❌ price < 0
                if (line.unit_price != null && Number(line.unit_price) < 0) {
                    throw new BadRequestException('Unit price must be >= 0');
                }

                // 🔥 calculate (ครั้งเดียวพอ!)
                const calc = this.discountDomainService.calculateLineAmount({
                    unit_price: line.unit_price,
                    qty: 1,
                    discount_expression: line.line_discount_rate
                        ? String(line.line_discount_rate)
                        : undefined
                });

                subtotal = subtotal.plus(calc.subtotal);
                discountAmount = discountAmount.plus(calc.discountAmount);
                netAmount = netAmount.plus(calc.netAmount);

                calculatedLines.push({ line, calc });
            }

            // 🔥 3. Create Header
            const headerData = CreatePriceListHeaderMapper.toPrismaCreateInput({
                ...dto,
            });

            const header = await this.createPriceListHeaderRepository.create(tx, headerData);

            // 🔥 4. Map Lines (ใช้ค่าที่คำนวณแล้ว)
            const linesData = calculatedLines.map(({ line, calc }) =>
                CreatePriceListLineMapper.toPrismaCreateManyInput(
                    line,
                    header.price_list_header_id,
                    calc
                )
            );

            // 🔥 5. Create Lines
            await this.createPriceListLineRepository.createMany(tx, linesData);

            // 🔥 6. Return
            return tx.price_list_header.findUnique({
                where: {
                    price_list_header_id: header.price_list_header_id
                },
                include: {
                    priceListItemLines: true,
                },
            });
        });
    }

    async findAll() {
        return this.prisma.price_list_header.findMany({
            include: {
                priceListItemLines: true,
            },
        });
    }
}