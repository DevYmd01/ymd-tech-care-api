import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CreateItemLotBalanceRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create Item Lot Balance
   *
   * รองรับทั้ง PrismaService ปกติ และ tx จาก transaction
   */
  async create(
    db: PrismaService | Prisma.TransactionClient,
    data: Prisma.item_lot_balanceCreateInput,
  ) {
    return db.item_lot_balance.create({
      data,
    });
  }

  /**
   * Create แบบเรียกตรง (ไม่ใช้ transaction)
   */
  async createDirect(
    data: Prisma.item_lot_balanceCreateInput,
  ) {
    return this.prisma.item_lot_balance.create({
      data,
    });
  }
}