import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateVendorContactDto } from '../dto/update-vendor.dto';

@Injectable()
export class UpdateVendorContactRepository {
    async sync(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        contacts: UpdateVendorContactDto[],
    ) {
        // 1. ดึงของเดิมจาก DB
        const existing = await tx.vendor_contacts.findMany({
            where: { vendor_id },
            select: { contact_id: true },
        });

        const existingIds = existing.map(e => e.contact_id);
        const incomingIds = contacts
            .filter(c => c.contact_id)
            .map(c => c.contact_id!);

        // 2. ลบตัวที่ FE ไม่ส่งมา
        const deleteIds = existingIds.filter(
            id => !incomingIds.includes(id),
        );

        if (deleteIds.length) {
            await tx.vendor_contacts.deleteMany({
                where: { contact_id: { in: deleteIds } },
            });
        }

        // 3. upsert
        for (const c of contacts) {
            if (c.contact_id) {
                await tx.vendor_contacts.update({
                    where: { contact_id: c.contact_id },
                    data: {
                        contact_name: c.contact_name,
                        email: c.email,
                        phone: c.phone,
                        position: c.position,
                        mobile: c.mobile,
                        is_primary: c.is_primary,
                    },
                });
            } else {
                await tx.vendor_contacts.create({
                    data: {
                        vendor_id,
                        contact_name: c.contact_name!,
                        email: c.email,
                        phone: c.phone,
                        position: c.position,
                        mobile: c.mobile!,
                        is_primary: c.is_primary ?? false,
                    },
                });
            }
        }
    }
}
