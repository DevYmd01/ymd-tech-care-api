import { Prisma } from '@prisma/client';
import { CreateCustomerMasterDto } from '../dto/create-customer-master.dto';

export class CreateCustomerMasterMapper {
  static toPrismaCreateInput(
    dto: CreateCustomerMasterDto,
  ): Prisma.customerCreateInput {
    return {
      customer_code: dto.customer_code,
      customer_name: dto.customer_name,
      customer_nameeng: dto.customer_nameeng,
      is_vat_registered: dto.is_vat_registered,
      credit_limit: dto.credit_limit,
      credit_term_days: dto.payment_term_days,
      payment_method_default: dto.payment_method_default,
      contact_name: dto.contact_name,
      phone: dto.phone,
      email: dto.email,
      website: dto.website,
      tax_id: dto.tax_id,
      is_active: dto.is_active ?? true,
      customer_type: { connect: { customer_type_id: dto.customer_type_id } },
      customer_group: { connect: { customer_group_id: dto.customer_group_id } },
      bill_group: dto.bill_group_id
        ? { connect: { bill_group_id: dto.bill_group_id } }
        : undefined,
     business_type: dto.business_type_id
        ? { connect: { business_type_id: dto.business_type_id } }
        : undefined,
      price_level: dto.price_level_id
        ? { connect: { id: dto.price_level_id } }
        : undefined,
    };
  }
}