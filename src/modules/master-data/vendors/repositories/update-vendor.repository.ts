import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UpdateVendorDto } from "../dto/update-vendor.dto";

@Injectable()
export class UpdateVendorRepository {
    update(
        tx: Prisma.TransactionClient,
        vendor_id: number,
        dto: UpdateVendorDto,
    ) {
        const data = Object.fromEntries(
            Object.entries({
                vendor_code: dto.vendor_code,
                vendor_name: dto.vendor_name,
                vat_registration_no: dto.vat_registration_no,
                is_vat_registered: dto.is_vat_registered,
                is_subject_to_wht: dto.is_subject_to_wht,
                payment_term_days: dto.payment_term_days,
                phone: dto.phone,
                email: dto.email,
                is_active: dto.is_active,
                vendor_type_id: dto.vendor_type_id,
                vendor_group_id: dto.vendor_group_id,
                currency_id: dto.currency_id,
            }).filter(([_, v]) => v !== undefined)
        );

        return tx.vendor.update({
            where: { vendor_id },
            data,
        });
    }

}
