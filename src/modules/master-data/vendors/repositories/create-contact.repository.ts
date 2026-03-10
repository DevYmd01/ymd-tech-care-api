import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorContactDto } from "../dto/create-contact.dto";

@Injectable()
export class CreateContactRepository {

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
}