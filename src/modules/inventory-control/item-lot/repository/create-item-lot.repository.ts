import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateItemLotRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    data: Prisma.item_lotCreateInput,
  ) {
    return this.prisma.item_lot.create({
      data,
    });
  }
}