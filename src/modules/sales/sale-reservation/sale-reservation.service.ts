import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSaleReservationHeaderDto } from './dto/create-sale-reservation-header.dto';
import { CreateSaleReservationHeaderMapper } from './mapper/create-sale-reservation-header.mapper';
import { CreateSaleReservationLineMapper } from './mapper/create-sale-reservation-line.mapper';
import { CreateSaleReservationLineRepository } from './repository/create-sale-reservation-line.repository';
import { CreateSaleReservationHeaderRepository } from './repository/create-sale-reservation-header.repository';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { TaxService } from './domain/service/tax.domain.service';
import { CalculationDomainService } from './domain/service/calculation.domain.service';
import { diffById } from '@/common/utils';
import { StockOptionQueryDto } from './dto/stock-options-query.dto';

import { IcOptionResolverService, StockValidationService, LotAllocationService } 
from '@/common/inventory/stock-options';

import { UpdateSaleReservationHeaderRepository } from './repository/update-sale-reservation-header.repository';
import { UpdateSaleReservationLineRepository } from './repository/update-sale-reservation-line.repository';
import { UpdateSaleReservationHeaderMapper } from './mapper/update-sale-reservation-header.mapper';
import { UpdateSaleReservationLineMapper } from './mapper/update-sale-reservation-line.mapper';
import { UpdateSaleReservationHeaderDto } from './dto/update-sale-reservation-header.dto';
import { UpdateSaleReservationLineDto } from './dto/update-sale-reservation-line.dto';


@Injectable()
export class SaleReservationService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly documentNumberService: DocumentNumberService,
    private readonly taxService: TaxService,
    private readonly calculationDomainService: CalculationDomainService,
    private readonly createSaleReservationHeaderRepository: CreateSaleReservationHeaderRepository,
    private readonly createSaleReservationLineRepository: CreateSaleReservationLineRepository,
    private readonly icOptionResolverService: IcOptionResolverService,
    private readonly stockValidationService: StockValidationService,
    private readonly lotAllocationService: LotAllocationService,
    private readonly updateSaleReservationHeaderRepository: UpdateSaleReservationHeaderRepository,
    private readonly updateSaleReservationLineRepository: UpdateSaleReservationLineRepository,
  ) { }

  async create(createSaleReservationHeaderDto: CreateSaleReservationHeaderDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. สร้าง Reservation document number
      const documentNo = await this.documentNumberService.generate({
        module_code: 'RS',
        document_type_code: 'RS',
        branch_id: createSaleReservationHeaderDto.branch_id || 0,
      });

      // 2. ดึงข้อมูลอัตราภาษี
      const taxConfig = await this.taxService.getTaxById(
        createSaleReservationHeaderDto.tax_code_id
      );
      const taxRate = new Prisma.Decimal(taxConfig.tax_rate).div(100);

      let subtotal = new Prisma.Decimal(0);
      let discountAmount = new Prisma.Decimal(0);
      let netAmount = new Prisma.Decimal(0);

      const calculatedLines: any[] = [];

      // 3. คำนวณมูลค่าของแต่ละบรรทัด
      for (const line of createSaleReservationHeaderDto.saleReservationLines || []) {
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
        exchange_rate: createSaleReservationHeaderDto.exchange_rate,
        discount_expression: createSaleReservationHeaderDto.discount_expression
          ? String(createSaleReservationHeaderDto.discount_expression)
          : undefined,
        tax_rate: taxRate.toNumber(),
      });

      // 5. สร้าง Sale Reservation Header
      const createHeaderData = CreateSaleReservationHeaderMapper.toPrismaCreateInput(
        createSaleReservationHeaderDto,
        documentNo,
        headerDocTotals
      );

      const createdHeader = await this.createSaleReservationHeaderRepository.create(
        tx,
        createHeaderData
      );

      // 6. สร้าง Sale Reservation Lines
      for (const { line, calc } of calculatedLines) {
        const createLineData = CreateSaleReservationLineMapper.toPrismaCreateInput(
          line,
          calc,
          (createdHeader as any).reservation_id
        );

        await this.createSaleReservationLineRepository.create(tx, createLineData);
      }

      // 7. คืนค่าข้อมูลที่ถูกสร้างเรียบร้อยแล้ว
      return tx.sale_reservation_header.findUnique({
        where: { reservation_id: (createdHeader as any).reservation_id },
        include: {
          saleReservationLines: true,
        },
      });
    });
  }


   async getStockByWarehouse(itemId: number) {
    const result = await this.prisma.$queryRaw<
      {
        warehouse_id: number;
        warehouse_name: string;
        qty_on_hand: number;
        qty_reserved: number;
        qty_available: number;
      }[]
    >`
      SELECT
        w.warehouse_id,
        w.warehouse_name,

        COALESCE(SUM(ilb.qty_on_hand), 0)   AS qty_on_hand,
        COALESCE(SUM(ilb.qty_reserved), 0)  AS qty_reserved,
        COALESCE(SUM(ilb.qty_available), 0) AS qty_available

      FROM warehouse w

      LEFT JOIN item_lot_balance ilb
        ON w.warehouse_id = ilb.warehouse_id
        AND ilb.item_id = ${itemId}

      GROUP BY w.warehouse_id, w.warehouse_name
      ORDER BY w.warehouse_id
    `;

    return result;
  }

  async getStockByLocationInWarehouse(
  warehouseId: number,
  itemId: number,
) {
  return this.prisma.$queryRaw<
    {
      location_id: number;
      location_name: string;
      qty_on_hand: number;
      qty_reserved: number;
      qty_available: number;
    }[]
  >`
    SELECT
      l.location_id,
      l.location_name,

      COALESCE(SUM(ilb.qty_on_hand), 0)   AS qty_on_hand,
      COALESCE(SUM(ilb.qty_reserved), 0)  AS qty_reserved,
      COALESCE(SUM(ilb.qty_available), 0) AS qty_available

    FROM location l

    LEFT JOIN item_lot_balance ilb
      ON l.location_id = ilb.location_id
      AND l.warehouse_id = ilb.warehouse_id
      AND ilb.item_id = ${itemId}

    WHERE l.warehouse_id = ${warehouseId}

    GROUP BY
      l.location_id,
      l.location_name

    ORDER BY l.location_id
  `;
}

  async sqApprovalPending() {
    const rows = await this.prisma.sale_quotation_approval_header.findMany({
      where: {
        status: {
          in: ['APPROVED', 'PARTIAL'],
        },
        saleReservationHeaders: {
          none: {},
        },
      },
      select: {
        aq_id: true,
        aq_no: true,
        aq_date: true,
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
    })

    return rows.map((row) => ({
      aq_id: row.aq_id,
      aq_no: row.aq_no,
      aq_date: row.aq_date,
      aq_status: row.status,

      sq_id: row.sq_id,
      sq_no: row.sq_header?.sq_no ?? null,
      sq_date: row.sq_header?.sq_date ?? null,
      sq_status: row.sq_header?.status ?? null,
    }))
  }

  async sqApprovalPendingById(aq_id: number) {
    const row = await this.prisma.sale_quotation_approval_header.findUnique({
      where: {
        aq_id,
      },
      include: {
        sq_header: {
          include: {
            customer: true,
            branch: true,
          },
        },
        saleQuotationApprovalLines: {
          include: {
            sq_line: {
              include: {
                item: true,
                uom: true,
              },
            },
          },
        },
      },
    });

    return row;
  }


  async findAll() {
    return this.prisma.sale_reservation_header.findMany({
      include: {
        saleReservationLines: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.sale_reservation_header.findUnique({
      where: { reservation_id: id },
      include: {
        saleReservationLines: true,
      },
    });
  }

  async getAvailableItems(id: number) {
    return this.prisma.sale_quotation_approval_line.findMany({
      where: {
        aq_id: id,
      },
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

  // =====================================
  // 1. RESOLVE IC OPTION
  // =====================================
  const setting =
    await this.icOptionResolverService.resolveConfig(
      branch_id!,
      'RS',
    );

  const {
    negative_stock_check,
    negative_stock_mode,
    quantity_validation_flag,
  } = setting;

  // =====================================
  // 2. WHERE
  // =====================================
  const where: any = {};

  if (item_id) where.item_id = item_id;
  if (branch_id) where.branch_id = branch_id;
  if (warehouse_id) where.warehouse_id = warehouse_id;
  if (location_id) where.location_id = location_id;

  // =====================================
  // 3. LOAD DATA
  // =====================================
  const rows =
    await this.prisma.item_lot_balance.findMany({
      where,
      include: {
        lot: true,
        warehouse: true,
        location: true,
      },
      orderBy: {
        updated_at: 'desc',
      },
    });

  // =====================================
  // 4. MAP DISPLAY QTY
  // =====================================
  const mapped = rows.map((row) => {
    let display_qty = 0;

    if (quantity_validation_flag === 1) {
      display_qty = Number(row.qty_available);
    }

    if (quantity_validation_flag === 2) {
      display_qty = Number(row.qty_reserved);
    }

    return {
      ...row,
      display_qty,
      max_pick_qty: display_qty, // 👈 สำคัญ
    };
  });

  // =====================================
  // 5. GROUP (summary)
  // =====================================
  const grouped =
    this.stockValidationService.groupByMode(
      mapped,
      negative_stock_mode,
      item_id,
    );

  // =====================================
  // 6. TOTAL QTY
  // =====================================
  const totalQty = grouped.reduce(
    (sum, r) => sum + Number(r.display_qty || 0),
    0,
  );

  // =====================================
  // 7. VALIDATE
  // =====================================
  const {
    can_use,
    warning_message,
  } = this.stockValidationService.validateStock(
    qty,
    totalQty,
    negative_stock_check,
  );

  // =====================================
  // 8. LOT DETAILS (สำหรับ UI)
  // =====================================
  let remaining = qty || 0;

  const lots = mapped.map((lot) => {
    let suggest_pick_qty = 0;

    if (remaining > 0) {
      suggest_pick_qty = Math.min(
        lot.display_qty,
        remaining,
      );
      remaining -= suggest_pick_qty;
    }

    return {
      ...lot,
      suggest_pick_qty, // 👈 optional แต่ดีมาก
    };
  });

  // =====================================
  // 9. PAGINATION (optional: ใช้กับ lots)
  // =====================================
  const total = lots.length;

  const pagedLots = lots.slice(
    skip,
    skip + limit,
  );

  // =====================================
  // 10. RESPONSE
  // =====================================
  return {
    page,
    limit,
    total,
    total_page: Math.ceil(total / limit),

    config: {
      negative_stock_check,
      negative_stock_mode,
      quantity_validation_flag,
    },

    summary: {
      required_qty: qty || 0,
      total_available: totalQty,
      can_use,
      warning_message,
    },

    lots: pagedLots,
  };
}


async update(id: number, updateSaleReservationHeaderDto: UpdateSaleReservationHeaderDto) {
        return this.prisma.$transaction(async (tx) => {
            // 1. ค้นหา Header เดิมเพื่อเช็คการมีอยู่
            const existingHeader = await tx.sale_reservation_header.findUnique({
                where: { reservation_id: id }, // Corrected to reservation_id
                include: { saleReservationLines: true }, // Corrected to saleReservationLines
            });

            if (!existingHeader) {
                throw new BadRequestException(`Sale Reservation with ID ${id} not found`); // Corrected message
            }

            // 2. ดึงข้อมูลภาษี
            const taxConfig = await this.taxService.getTaxById(
                updateSaleReservationHeaderDto.tax_code_id
            );
            const taxRate = new Prisma.Decimal(taxConfig.tax_rate).div(100);

            let subtotal = new Prisma.Decimal(0);
            let discountAmount = new Prisma.Decimal(0);
            let netAmount = new Prisma.Decimal(0);

            const calculatedLines: {
                line: UpdateSaleReservationLineDto;
                calc: any;
            }[] = [];

            // 3. คำนวณแต่ละบรรทัดก่อน
            for (const line of updateSaleReservationHeaderDto.saleReservationLines || []) {
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
                exchange_rate: updateSaleReservationHeaderDto.exchange_rate,
                discount_expression: updateSaleReservationHeaderDto.discount_expression
                    ? String(updateSaleReservationHeaderDto.discount_expression)
                    : undefined,
                tax_rate: taxRate.toNumber(),
            });

            // 5. อัปเดต Header (ใช้ Mapper และ Repository ที่ถูกต้อง)
            const updateHeaderData = UpdateSaleReservationHeaderMapper.toPrismaUpdateInput(
                updateSaleReservationHeaderDto,
                headerDocTotals
            );
            await this.updateSaleReservationHeaderRepository.update(tx, updateHeaderData, id); // ใช้ repository ที่ถูกต้อง

            // 6. ใช้ diffById จัดการกับรายการเพิ่ม-ลบ-แก้ไขบรรทัด (saleReservationLines)
            const existingLines = existingHeader.saleReservationLines || []; // ใช้ saleReservationLines
            const diff = diffById(
                existingLines,
                updateSaleReservationHeaderDto.saleReservationLines || [], // ใช้ saleReservationLines
                'reservation_line_id' // ใช้ reservation_line_id
            );

            // 7. ลบรายการที่ถูกเอาออก (Delete)
            if (diff.toDelete.length > 0) {
                await tx.sale_reservation_line.deleteMany({ // ใช้ sale_reservation_line
                    where: {
                        reservation_line_id: { in: diff.toDelete.map((l: any) => l.reservation_line_id) }, // ใช้ reservation_line_id
                    },
                });
            }

            // 8. อัปเดตรายการเดิม (Update)
            for (const line of diff.toUpdate) {
                const calcObj = calculatedLines.find(l => l.line.reservation_line_id === line.reservation_line_id)?.calc; // ใช้ reservation_line_id
                if (!calcObj) continue;
                
                const updateLineData = UpdateSaleReservationLineMapper.toPrismaUpdateInput(line, calcObj); // ใช้ mapper ที่ถูกต้อง
                await this.updateSaleReservationLineRepository.update(tx, updateLineData, line.reservation_line_id!); // ใช้ repository และ ID ที่ถูกต้อง
            }

            // 9. สร้างรายการใหม่ (Create)
            for (const line of diff.toCreate) {
                const calcObj = calculatedLines.find(l => l.line === line)?.calc;
                if (!calcObj) continue;
                
                const createLineData = CreateSaleReservationLineMapper.toPrismaCreateInput(line as any, calcObj, id); // ใช้ mapper ที่ถูกต้อง, id คือ reservation_id
                await this.createSaleReservationLineRepository.create(tx, createLineData); // ใช้ repository ที่ถูกต้อง
            }

            // 10. ส่งคืนข้อมูล Sale Quotation ที่ทำการอัปเดตเรียบร้อยแล้ว
            return tx.sale_reservation_header.findUnique({
                where: { reservation_id: id },
                include: {
                    saleReservationLines: true,
                },
            });
        });
    }



  

} 
