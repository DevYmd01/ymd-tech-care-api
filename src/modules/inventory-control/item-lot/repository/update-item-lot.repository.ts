import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateItemLotRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async update(
    id: number,
    data: Prisma.item_lotUpdateInput,
  ) {
    return this.prisma.item_lot.update({
      where: {
        lot_id: id,
      },
      data,
    });
  }
}