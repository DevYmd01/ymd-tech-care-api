import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorContactDto } from "../dto/create-vendor.dto";

@Injectable()
export class VendorContactRepository {
    createMany(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        contacts: CreateVendorContactDto[],
    ) {
        if (!contacts?.length) return;

        return tx.vendor_contacts.createMany({
            data: contacts.map(c => ({
                vendor_id,
                contact_name: c.contact_name,
                email: c.email,
                phone: c.phone,
                mobile: c.mobile,
                is_primary: c.is_primary,
                position: c.position,
            })),
        });
    }

    /// sync contacts (เพิ่ม / ลบ / แก้)
    async syncVendorContacts(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        contacts: CreateVendorContactDto[],
    ) {
        // 1. ลบของเดิมทั้งหมด
        await tx.vendor_contacts.deleteMany({
            where: { vendor_id },
        });

        // 2. สร้างใหม่ทั้งหมด
        if (contacts?.length) {
            await tx.vendor_contacts.createMany({
                data: contacts.map(c => ({
                    vendor_id,
                    contact_name: c.contact_name,
                    email: c.email,
                    phone: c.phone,
                    mobile: c.mobile,
                    is_primary: c.is_primary,
                    position: c.position,
                })),
            });
        }
    }
}
