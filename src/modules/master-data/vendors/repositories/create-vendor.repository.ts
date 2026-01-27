import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateVendorDto } from "../dto/create-vendor.dto";


@Injectable()
export class CreateVendorRepository {
    create(tx: Prisma.TransactionClient, dto: CreateVendorDto) {
        return tx.vendor.create({
            data: {
                vendor_code: dto.vendor_code!,
                vendor_name: dto.vendor_name!,
                tax_id: dto.tax_id,
                is_vat_registered: dto.is_vat_registered ?? false,
                payment_term_days: dto.payment_term_days!,
                phone: dto.phone,
                email: dto.email,
                is_active: dto.is_active ?? true,
                vendor_type_id: dto.vendor_type_id!,
                vendor_group_id: dto.vendor_group_id!,
                currency_id: dto.currency_id!,

            },
        });
    }
}