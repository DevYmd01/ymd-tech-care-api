import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateCustomerMasterRepository {
  async create(
    tx: Prisma.TransactionClient, 
    data: Prisma.customerCreateInput
) {
    return tx.customer.create({ 
        data 
    });
  }
}