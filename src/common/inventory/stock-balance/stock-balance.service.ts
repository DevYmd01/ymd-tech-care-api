import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StockBalanceService {
  constructor(private readonly prisma: PrismaService) {}

  // ======================================================
  // FIND ONE BALANCE
  // ======================================================
async findOne(
  data: {
    item_id: number;
    warehouse_id: number;
    location_id?: number | null;
    branch_id: number;
  },
  tx?: Prisma.TransactionClient,
) {
  const client = tx ?? this.prisma;

  if (
    data.item_id == null ||
    data.warehouse_id == null ||
    data.branch_id == null ||
    data.location_id == null
  ) {
    throw new BadRequestException('Missing required fields');
  }

//   const locationId = data.location_id ?? null;

  return client.item_stock_balance.findFirst({
    where: {
      item_id: data.item_id,
      warehouse_id: data.warehouse_id,
      branch_id: data.branch_id,
      location_id: data.location_id,
    },
  });
}

  // ======================================================
  // ADJUST STOCK
  // ======================================================
  async adjust(
  data: {
    item_id: number;
    warehouse_id: number;
    location_id: number;
    branch_id: number;
    qty: number;
  },
  tx?: Prisma.TransactionClient,
) {
  const client = tx ?? this.prisma;
 
  if (data.qty === 0) {
    throw new BadRequestException('Qty cannot be 0');
  }
;

  return client.item_stock_balance.upsert({
    where: {
      item_id_branch_id_warehouse_id_location_id: {
        item_id: data.item_id,
        branch_id: data.branch_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
      },
    },

    create: {
      item_id: data.item_id,
      branch_id: data.branch_id,
      warehouse_id: data.warehouse_id,
      location_id: data.location_id,

      qty_on_hand: new Prisma.Decimal(data.qty),
      qty_reserved: new Prisma.Decimal(0),
      qty_available: new Prisma.Decimal(data.qty),
    },

    update: {
      qty_on_hand: {
        increment: new Prisma.Decimal(data.qty),
      },
      qty_available: {
        increment: new Prisma.Decimal(data.qty),
      },
    },
  });
}
}