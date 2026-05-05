import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { diffById } from '@/common/utils';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateSaleOrderHeaderDto } from './dto/create-sale-order-header.dto';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { CreateSaleOrderHeaderRepository } from './repository/create-sale-order-header.repository';
import { CreateSaleOrderLineRepository } from './repository/create-sale-order-line.repository';
import { CreateSaleOrderHeaderMapper } from './mapper/create-sale-order-header.mapper';
import { CreateSaleOrderLineMapper } from './mapper/create-sale-order-line.mapper';
import { StockOptionQueryDto } from './dto/stock-options-query.dto';
import { UpdateSaleOrderHeaderRepository } from './repository/update-sale-order-header.repository';
import { UpdateSaleOrderLineRepository } from './repository/update-sale-order-line.repository';
import { UpdateSaleOrderHeaderMapper } from './mapper/update-sale-order-header.mapper';
import { UpdateSaleOrderLineMapper } from './mapper/update-sale-order-line.mapper';
import { UpdateSaleOrderHeaderDto } from './dto/update-sale-order-header.dto';
import { UpdateSaleOrderLineDto } from './dto/update-sale-order-line.dto';


@Injectable()
export class SaleOrderService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly taxService: TaxService,
        private readonly calculationDomainService: CalculationDomainService,
        private readonly createSaleOrderHeaderRepository: CreateSaleOrderHeaderRepository,
        private readonly createSaleOrderLineRepository: CreateSaleOrderLineRepository,
        private readonly createSaleOrderHeaderMapper: CreateSaleOrderHeaderMapper,
        private readonly createSaleOrderLineMapper: CreateSaleOrderLineMapper,
        private readonly updateSaleOrderHeaderRepository: UpdateSaleOrderHeaderRepository,
        private readonly updateSaleOrderLineRepository: UpdateSaleOrderLineRepository,
        private readonly updateSaleOrderHeaderMapper: UpdateSaleOrderHeaderMapper,
        private readonly updateSaleOrderLineMapper: UpdateSaleOrderLineMapper,
    ) { }


    async create(createSaleOrderDto: CreateSaleOrderHeaderDto) {
        return this.prisma.$transaction(async (tx) => {
            // 1. สร้าง Sale Order document number
            const documentNo = await this.documentNumberService.generate({
                module_code: 'SO',
                document_type_code: 'SO',
                branch_id: createSaleOrderDto.branch_id || 0,
            });

            // 2. ดึงข้อมูลอัตราภาษี
            const taxConfig = await this.taxService.getTaxById(
                createSaleOrderDto.tax_code_id
            );
            const taxRate = new Prisma.Decimal(taxConfig.tax_rate).div(100);

            let subtotal = new Prisma.Decimal(0);
            let discountAmount = new Prisma.Decimal(0);
            let netAmount = new Prisma.Decimal(0);

            const calculatedLines: any[] = [];

            // 3. คำนวณมูลค่าของแต่ละบรรทัด
            for (const line of createSaleOrderDto.saleOrderLines || []) { // Corrected to saleOrderLines
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

            // 4. คำนวณมูลค่ารวมระดับ Header
            const headerDocTotals = this.calculationDomainService.calculateHeaderTotal({
                subtotal: netAmount.toNumber(),
                exchange_rate: createSaleOrderDto.exchange_rate,
                discount_expression: createSaleOrderDto.discount_expression
                    ? String(createSaleOrderDto.discount_expression)
                    : undefined,
                tax_rate: taxRate.toNumber(),
            });

            // 5. สร้าง Sale Order Header
            const createHeaderData = CreateSaleOrderHeaderMapper.toPrismaCreateInput(
                createSaleOrderDto,
                documentNo,
                headerDocTotals
            );

            const createdHeader = await this.createSaleOrderHeaderRepository.create(tx, createHeaderData);

            // 6. สร้าง Sale Order Lines
            for (const { line, calc } of calculatedLines) {
                const createLineData = CreateSaleOrderLineMapper.toPrismaCreateInput(line, calc, createdHeader.so_id);
                await this.createSaleOrderLineRepository.create(tx, createLineData);
            }
            // 7. คืนค่าข้อมูลที่ถูกสร้างเรียบร้อยแล้ว
            return tx.sale_order_header.findUnique({ where: { so_id: createdHeader.so_id }, include: { saleOrderLines: true } });
        });
    }

    async sqReservationPending() {
        const rows = await this.prisma.sale_reservation_header.findMany({
            where: {
                saleOrderHeaders: {
                    none: {},
                },
            },
            select: {
                reservation_id: true,
                reservation_no: true,
                reservation_date: true,
                aq_id: true,
                aq_header: {
                    select: {
                        aq_no: true,
                        aq_date: true,
                        status: true,
                    },
                },
                status: true,
                sq_id: true,
                sq_header: {
                    select: {
                        sq_no: true,
                        sq_date: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                aq_id: 'desc',
            },
        });

        return rows
    }

    async sqReservationPendingById(id: number) {
        const row = await this.prisma.sale_reservation_header.findUnique({
            where: {
                reservation_id: id,
            },
            include: {
                saleReservationLines: {
                    include: {
                        item: true,
                        uom: true,
                    },
                },
            },
        });

        return row;
    }



    async findAll() {
        return this.prisma.sale_order_header.findMany();
    }

    async findOne(id: number) {
        return this.prisma.sale_order_header.findUnique({
            where: { so_id: id },
            include: { saleOrderLines: true },
        });
    }


    async stockOptionsQuery(
        stockOptionQueryDto: StockOptionQueryDto,
    ) {
        const {
            page = 1,
            limit = 20,
            item_id,
            branch_id,
            warehouse_id,
            location_id,
            qty,
        } = stockOptionQueryDto;

        const skip = (page - 1) * limit;

        // ===============================
        // WHERE CONDITION
        // ===============================
        const where: any = {
            qty_available: {
                gt: 0,
            },
        };

        if (item_id) {
            where.item_id = item_id;
        }

        if (branch_id) {
            where.branch_id = branch_id;
        }

        if (warehouse_id) {
            where.warehouse_id = warehouse_id;
        }

        if (location_id) {
            where.location_id = location_id;
        }

        // ===============================
        // TOTAL COUNT
        // ===============================
        const total =
            await this.prisma.item_lot_balance.count({
                where,
            });

        // ===============================
        // DATA QUERY
        // ===============================
        const rows =
            await this.prisma.item_lot_balance.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    updated_at: 'desc',
                },
                include: {
                    lot: true,
                    warehouse: true,
                    location: true,
                },
            });

        // ===============================
        // AUTO PICK QTY (optional)
        // ===============================
        const data = rows.map((row) => {
            const available = Number(row.qty_available);

            return {
                ...row,
                pick_qty: qty
                    ? Math.min(available, qty)
                    : 0,
            };
        });

        // ===============================
        // RESPONSE
        // ===============================
        return {
            page,
            limit,
            total,
            total_page: Math.ceil(total / limit),
            data,
        };
    }

    async pending(id: number) {
        return this.prisma.sale_order_header.update({
            where: { so_id: id },
            data: { status: 'PENDING' },
        });
    }


async update(
    so_id: number,
    dto: UpdateSaleOrderHeaderDto,
) {
    return this.prisma.$transaction(async (tx) => {

        // 1. ตรวจสอบ SO header (ใช้ table ให้ตรง!)
        const existingHeader = await tx.sale_order_header.findUnique({
            where: { so_id },
            include: { saleOrderLines: true },
        });

        if (!existingHeader) {
            throw new BadRequestException(`Sale Order ${so_id} not found`);
        }

        // 2. tax config
        const taxConfig = await this.taxService.getTaxById(dto.tax_code_id);
        const taxRate = new Prisma.Decimal(taxConfig.tax_rate).div(100);

        let subtotal = new Prisma.Decimal(0);
        let discountAmount = new Prisma.Decimal(0);
        let netAmount = new Prisma.Decimal(0);

        const calculatedLines: {
            line: UpdateSaleOrderLineDto;
            calc: any;
        }[] = [];

        // 3. calc line
        for (const line of dto.saleOrderLines || []) { // Corrected property name
            const calc = this.calculationDomainService.calculateLine({
                qty: line.qty,
                unit_price: line.unit_price,
                discount_expression: line.discount_expression
                    ? String(line.discount_expression)
                    : undefined,
            });

            subtotal = subtotal.plus(calc.subtotal);
            discountAmount = discountAmount.plus(calc.discountAmount);
            netAmount = netAmount.plus(calc.netAmount);

            calculatedLines.push({ line, calc });
        }

        // 4. header total (ใช้ Decimal ตรง ๆ)
       // 4. header total - ใช้ netAmount แทน subtotal!
const headerDocTotals =
    this.calculationDomainService.calculateHeaderTotal({
        subtotal: netAmount.toNumber(), // 👈 เปลี่ยนจาก subtotal เป็น netAmount
        exchange_rate: dto.exchange_rate,
        discount_expression: dto.discount_expression
            ? String(dto.discount_expression)
            : undefined,
        tax_rate: taxRate.toNumber(),
    });

        // 5. update header
        const updateHeaderData =
            UpdateSaleOrderHeaderMapper.toPrismaUpdateInput(
                dto, // so_no is not part of the DTO for update, and not expected by the mapper
                headerDocTotals,
            );

        await this.updateSaleOrderHeaderRepository.update(
            so_id,
            updateHeaderData,
            tx,
        );

        // 6. diff line (ใช้ so_line_id)
        const existingLines = existingHeader.saleOrderLines || [];
        // Corrected property name
        const diff = diffById(
            existingLines,
            dto.saleOrderLines || [],
            "so_line_id",
        );

        // 7. delete
        if (diff.toDelete.length > 0) {
            await tx.sale_order_line.deleteMany({
                where: {
                    so_line_id: {
                        in: diff.toDelete.map((l: any) => l.so_line_id),
                    },
                },
            });
        }

        // 8. update
        for (const line of diff.toUpdate) {
            const calc = calculatedLines.find( // Explicitly cast line to UpdateSaleOrderLineDto
                (l) => l.line.so_line_id === line.so_line_id,
            )?.calc;

            if (!calc) continue;

            const updateLineData =
                UpdateSaleOrderLineMapper.toPrismaUpdateInput(
                    line as UpdateSaleOrderLineDto, // Cast to expected type
                    calc,
                    so_id,
                );

            await this.updateSaleOrderLineRepository.update(
                line.so_line_id!,
                updateLineData,
                tx,
            );
        }

        // 9. create
        for (const line of diff.toCreate) {
            const calc = calculatedLines.find((l) => l.line === line)?.calc;
            if (!calc) continue;

            const createLineData =
                CreateSaleOrderLineMapper.toPrismaCreateInput(
                    line as any,
                    calc,
                    so_id,
                );

            await this.createSaleOrderLineRepository.create( // Corrected argument order
                tx,
                createLineData,
            );
        }

        // 10. return
        return tx.sale_order_header.findUnique({
            where: { so_id },
            include: {
                saleOrderLines: true,
            },
        });
    });
}

}
