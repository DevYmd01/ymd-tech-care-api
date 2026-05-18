import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { LotTransactionRepository } from './repository/lot-transaction.repository';
import { LotTransactionMapper } from './mapper/lot-transaction.mapper';
import { LotTransactionInterface } from './interfaces/lot-transaction.interface';

@Injectable()
export class LotTransactionService {
  constructor(
    private readonly lotTransactionRepository: LotTransactionRepository,
  ) {}

  // ======================================================
  // POST LOT TRANSACTION (MAIN ENTRY)
  // ======================================================
  async create(
    dto: LotTransactionInterface,
    tx?: Prisma.TransactionClient,
  ) {

     // แปลง DTO → Prisma Input
        const payload = LotTransactionMapper.toCreate(dto);
    
        // บันทึก stock transaction
        const transaction =
          await this.lotTransactionRepository.create(
            payload,
            tx,
          );
    
        // แปลง response ก่อน return
        return LotTransactionMapper.toResponse(transaction);
  }

  async findAll() {
    return this.lotTransactionRepository.findAll();
  }


}