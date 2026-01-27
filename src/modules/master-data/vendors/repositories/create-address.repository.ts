import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateAddressDto } from "../dto/create-address.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateAddressRepository {

    createMany(params: {
        tx: Prisma.TransactionClient;
        vendor_id: number;
        addresses: CreateAddressDto[];
    }) {
        const { tx, vendor_id, addresses } = params;

        return tx.vendor_address.createMany({
            data: addresses.map(addr => ({
                vendor_id: vendor_id,
                address_type: addr.address_type,
                address: addr.address ?? '',
                district: addr.district ?? '',
                province: addr.province ?? '',
                postal_code: addr.postal_code ?? '',
                country: addr.country ?? '',
                contact_person: addr.contact_person ?? '',
                phone: addr.phone ?? '',
                phone_extension: addr.phone_extension ?? '',
                email: addr.email ?? '',
                is_default: addr.is_default ?? false,
                is_active: addr.is_active ?? true,
            })),
        });
    }


}
