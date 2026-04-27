import { Injectable } from '@nestjs/common';
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


@Injectable()
export class SaleReservationService {
    
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentNumberService: DocumentNumberService,
    private readonly taxService: TaxService,
    private readonly calculationDomainService: CalculationDomainService,
    private readonly createSaleReservationHeaderRepository: CreateSaleReservationHeaderRepository,
    private readonly createSaleReservationLineRepository: CreateSaleReservationLineRepository,
) {}

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

} 
