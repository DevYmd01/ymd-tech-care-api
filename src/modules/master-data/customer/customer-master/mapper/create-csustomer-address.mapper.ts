import { Prisma } from '@prisma/client';
import { CreateCustomerAddressDto } from '../dto/create-customer-address.dto';

export class CreateCustomerAddressMapper {
  static toPrismaCreateInput(
    dto: CreateCustomerAddressDto,
    customer_id: number,
  ): Prisma.customer_addressCreateManyInput  {
    return {
      customer_id: customer_id,
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
    is_default: dto.is_default ?? false,
    is_active: dto.is_active ?? true,
    };
  }
}