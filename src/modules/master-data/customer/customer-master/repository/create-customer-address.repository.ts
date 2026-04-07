import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateCustomerAddressRepository {
  async createMany(
    tx: Prisma.TransactionClient, 
    data: Prisma.customer_addressCreateManyInput[]
) {
    return tx.customer_address.createMany({ 
        data
     });
  }
}