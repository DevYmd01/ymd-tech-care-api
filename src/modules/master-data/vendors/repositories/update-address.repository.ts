import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateVendorAddressDto } from '../dto/update-vendor.dto';

@Injectable()
export class UpdateVendorAddressRepository {
    async sync(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        addresses: UpdateVendorAddressDto[],
    ) {

        // 1. ดึงของเดิมจาก DB
        const existing = await tx.vendor_address.findMany({
            where: { vendor_id },
            select: { vendor_address_id: true },
        });

        const existingIds = existing.map(e => e.vendor_address_id);
        const incomingIds = addresses
            .filter(c => c.vendor_address_id)
            .map(c => c.vendor_address_id!);

        // 2. ลบตัวที่ FE ไม่ส่งมา
        const deleteIds = existingIds.filter(
            id => !incomingIds.includes(id),
        );

        if (deleteIds.length) {
            await tx.vendor_address.deleteMany({
                where: { vendor_address_id: { in: deleteIds } },
            });
        }

        for (const addr of addresses) {
            if (addr.vendor_address_id) {
                // UPDATE
                await tx.vendor_address.update({
                    where: { vendor_address_id: addr.vendor_address_id },
                    data: {
                        address: addr.address,
                        district: addr.district,
                        province: addr.province,
                        postal_code: addr.postal_code,
                        country: addr.country,
                        contact_person: addr.contact_person,
                        phone: addr.phone,
                        phone_extension: addr.phone_extension,
                        email: addr.email,
                        is_default: addr.is_default,
                        is_active: addr.is_active,
                    },
                });
            } else {
                // CREATE
                await tx.vendor_address.create({
                    data: {
                        vendor_id,
                        address_type: addr.address_type!,
                        address: addr.address!,
                        district: addr.district!,
                        province: addr.province!,
                        postal_code: addr.postal_code!,
                        country: addr.country!,
                        contact_person: addr.contact_person!,
                        phone: addr.phone!,
                        phone_extension: addr.phone_extension!,
                        email: addr.email!,
                        is_default: addr.is_default ?? false,
                        is_active: addr.is_active ?? true,
                    },
                });
            }
        }
    }
}
