import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateCustomerAddressRepository {
  async update(
    tx: Prisma.TransactionClient,
    id: number,
    data: Prisma.customer_addressUpdateInput,
  ) {
    return tx.customer_address.update({
      where: { customer_address_id: id },
      data,
    });
  }
}