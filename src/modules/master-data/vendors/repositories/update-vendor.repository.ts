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

    const data: Prisma.vendorUpdateInput = {

      ...(dto.vendor_code !== undefined && {
        vendor_code: dto.vendor_code
      }),

      ...(dto.vendor_name !== undefined && {
        vendor_name: dto.vendor_name
      }),

            ...(dto.vendor_nameeng !== undefined && {
        vendor_nameeng: dto.vendor_nameeng
      }),

      ...(dto.vat_registration_no !== undefined && {
        vat_registration_no: dto.vat_registration_no
      }),

      ...(dto.is_vat_registered !== undefined && {
        is_vat_registered: dto.is_vat_registered
      }),

      ...(dto.is_subject_to_wht !== undefined && {
        is_subject_to_wht: dto.is_subject_to_wht
      }),

      ...(dto.payment_term_days !== undefined && dto.payment_term_days !== null && {
        payment_term_days: dto.payment_term_days
      }),

      ...(dto.phone !== undefined && {
        phone: dto.phone
      }),

      ...(dto.phone_extension !== undefined && {
        phone_extension: dto.phone_extension
      }),

      ...(dto.email !== undefined && {
        email: dto.email
      }),

      ...(dto.is_active !== undefined && {
        is_active: dto.is_active
      }),

      ...(dto.vendor_type_id !== undefined && {
        vendor_type: {
          connect: { vendor_type_id: dto.vendor_type_id }
        }
      }),

      ...(dto.vendor_group_id !== undefined && {
        vendor_group: {
          connect: { vendor_group_id: dto.vendor_group_id }
        }
      }),

      ...(dto.currency_id !== undefined && {
        currency: {
          connect: { currency_id: dto.currency_id }
        }
      }),

    };

    return tx.vendor.update({
      where: { vendor_id },
      data,
    });

  }

}