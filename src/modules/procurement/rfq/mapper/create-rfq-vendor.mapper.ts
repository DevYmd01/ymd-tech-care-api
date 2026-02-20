import { Prisma } from "@prisma/client";
import { CreateSFRQVendorDTO } from "../dto/create-sfrq-vendor.dto";

export class CreateRFQVendorMapper {
    static toPrismaCreateInput(
        vendors: CreateSFRQVendorDTO[],
        rfq_id: number
    ): Prisma.rfq_vendorCreateManyInput[] {

        return vendors.map(vendor => ({
            rfq_id: rfq_id,

            vendor_id: vendor.vendor_id,

            status: vendor.status || 'NEW',

            sent_at: vendor.sent_at || new Date(),

            responded_at: vendor.responded_at || null,

            contact_email: vendor.contact_email || null,

            contact_person: vendor.contact_person || null,

            note: vendor.note || null,

            is_active: vendor.is_active || true,
        }));
    }
}