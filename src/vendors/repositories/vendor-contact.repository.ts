import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorContactDto } from "../dto/create-vendor.dto";
import { UpdateVendorContactDto } from "../dto/update-vendor.dto";

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
        contacts: UpdateVendorContactDto[],
    ) {
        // ดึงข้อมูลเดิม
        const existingContacts = await tx.vendor_contacts.findMany({
            where: { vendor_id },
        });

        const incomingIds = contacts
            .filter(c => c.contact_id)
            .map(c => c.contact_id);

        // ลบข้อมูลที่หายไป
        const toDelete = existingContacts.filter(
            ec => !incomingIds.includes(ec.contact_id),
        );

        if (toDelete.length > 0) {
            await tx.vendor_contacts.deleteMany({
                where: {
                    contact_id: { in: toDelete.map(c => c.contact_id) },
                },
            });
        }

        // 3️⃣ เพิ่ม / แก้ไข
        for (const c of contacts) {
            if (c.contact_id) {
                // ✏️ update
                await tx.vendor_contacts.update({
                    where: { contact_id: c.contact_id },
                    data: {
                        contact_name: c.contact_name,
                        email: c.email,
                        phone: c.phone,
                        mobile: c.mobile,
                        position: c.position,
                        is_primary: c.is_primary,
                    },
                });
            } else {
                // ➕ create
                await tx.vendor_contacts.create({
                    data: {
                        vendor_id,
                        contact_name: c.contact_name,
                        email: c.email,
                        phone: c.phone,
                        mobile: c.mobile,
                        position: c.position,
                        is_primary: c.is_primary,
                    },
                });
            }
        }
    }


}
