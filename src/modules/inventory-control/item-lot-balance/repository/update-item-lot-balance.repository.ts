import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateItemLotBalanceRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Update Item Lot Balance
   *
   * รองรับทั้ง PrismaService ปกติ และ tx จาก transaction
   */
  async update(
    db: PrismaService | Prisma.TransactionClient,
    id: number,
    data: Prisma.item_lot_balanceUpdateInput,
  ) {
    return db.item_lot_balance.update({
      where: {
        lot_balance_id: id,
      },
      data,
    });
  }

  /**
   * Update แบบเรียกตรง (ไม่ใช้ transaction)
   */
  async updateDirect(
    id: number,
    data: Prisma.item_lot_balanceUpdateInput,
  ) {
    return this.prisma.item_lot_balance.update({
      where: {
        lot_balance_id: id,
      },
      data,
    });
  }
}