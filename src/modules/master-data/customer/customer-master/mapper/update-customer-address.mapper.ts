import { Prisma } from '@prisma/client';
import { UpdateCustomerAddressDto } from '../dto/update-customer-address.dto';

export class UpdateCustomerAddressMapper {
  static toPrismaUpdateInput(
    dto: UpdateCustomerAddressDto
  ): Prisma.customer_addressUpdateInput {
    return {
      address_type: dto.address_type,
      address: dto.address,
      sub_district: dto.sub_district,
      district: dto.district,
      province: dto.province,
      postal_code: dto.postal_code,
      country: dto.country,
      contact_person: dto.contact_person,
      phone: dto.phone,
      phone_extension: dto.phone_extension,
      email: dto.email,
      is_default: dto.is_default,
      is_active: dto.is_active
    };
  }
}