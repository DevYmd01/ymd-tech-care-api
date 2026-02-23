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

    async updateMany(
        tx: Prisma.TransactionClient,
        data: Prisma.rfq_vendorUncheckedUpdateInput[]
    ) {
        const updates = data.map(vendor =>
            tx.rfq_vendor.update({
                where: {
                    rfq_vendor_id: vendor.rfq_vendor_id as number
                },
                data: vendor
            })
        );

        return Promise.all(updates);
    }
}