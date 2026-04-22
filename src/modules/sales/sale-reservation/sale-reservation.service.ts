import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class SaleReservationService {
    
  constructor(private readonly prisma: PrismaService) {}

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

}
