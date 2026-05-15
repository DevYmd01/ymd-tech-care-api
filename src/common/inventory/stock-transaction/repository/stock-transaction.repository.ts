import { Injectable } from '@nestjs/common';

import { Prisma, stock_transaction } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockTransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.stock_transactionCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<stock_transaction> {
    const prismaClient = tx ?? this.prisma;

    return prismaClient.stock_transaction.create({
      data,
    });
  }

  async findAll(): Promise<stock_transaction[]> {
    return this.prisma.stock_transaction.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
  }


  async findManyByItem(
    item_id: number,
  ): Promise<stock_transaction[]> {
    return this.prisma.stock_transaction.findMany({
      where: {
        item_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByRefDoc(
    ref_doc_type: string,
    ref_doc_no: string,
  ): Promise<stock_transaction[]> {
    return this.prisma.stock_transaction.findMany({
      where: {
        ref_doc_type,
        ref_doc_no,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(
    stock_transaction_id: number,
  ): Promise<stock_transaction | null> {
    return this.prisma.stock_transaction.findUnique({
      where: {
        stock_transaction_id,
      },
    });
  }
}
