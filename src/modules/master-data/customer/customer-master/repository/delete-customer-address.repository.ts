import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeleteCustomerAddressRepository {
  async deleteMany(tx: Prisma.TransactionClient, ids: number[]) {
    return tx.customer_address.deleteMany({
      where: {
        customer_address_id: {
          in: ids,
        },
      },
    });
  }
}