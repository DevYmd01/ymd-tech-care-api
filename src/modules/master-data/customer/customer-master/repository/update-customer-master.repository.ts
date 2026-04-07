import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateCustomerMasterRepository {
  async update(
    tx: Prisma.TransactionClient,
    id: number,
    data: Prisma.customerUpdateInput
  ) {
    return tx.customer.update({
      where: { customer_id: id },
      data,
    });
  }
}
