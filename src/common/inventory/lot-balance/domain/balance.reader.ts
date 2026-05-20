import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BalanceReader {

  static async getBalances(
    item_id: number,
    warehouse_id?: number,
    location_id?: number,
  ) {

    return prisma.item_lot_balance.findMany({
      where: {
        item_id,
        ...(warehouse_id ? { warehouse_id } : {}),
        ...(location_id ? { location_id } : {}),
      },
      include: {
        lot: true,
      },
    });
  }
}