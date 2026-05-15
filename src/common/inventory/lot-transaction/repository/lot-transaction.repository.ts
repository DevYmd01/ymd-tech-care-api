import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, lot_transaction } from '@prisma/client';

@Injectable()
export class LotTransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ======================================================
  // CREATE LOT TRANSACTION
  // ======================================================
  async create(
    data: Prisma.lot_transactionCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const prismaClient = tx ?? this.prisma;

    const result = await prismaClient.lot_transaction.create({
      data
    });

    return result;
  }

    async findAll(): Promise<lot_transaction[]> {
      return this.prisma.lot_transaction.findMany({
        orderBy: {
          created_at: 'desc',
        },
      });
    }
  
  
    async findManyByItem(
      item_id: number,
    ): Promise<lot_transaction[]> {
      return this.prisma.lot_transaction.findMany({
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
    ): Promise<lot_transaction[]> {
      return this.prisma.lot_transaction.findMany({
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
      lot_transaction_id: number,
    ): Promise<lot_transaction | null> {
      return this.prisma.lot_transaction.findUnique({
        where: {
          lot_transaction_id,
        },
      });
    }

}