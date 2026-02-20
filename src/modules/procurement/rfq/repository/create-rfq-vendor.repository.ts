import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateRFQVendorRepository {
    async createMany(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_vendorCreateManyInput[]
    ) {
        return tx.rfq_vendor.createMany({ data });
    }
}