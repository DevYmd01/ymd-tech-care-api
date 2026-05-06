import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAddressDto } from '../dto/creact-address.dto';

@Injectable()
export class AddressMapper {
  toPrismaCreateInput(dto: CreateAddressDto, employee_id: number): Prisma.employee_addressCreateInput {
    return {
                        employee: { connect: { employee_id } },
                        address_type: dto.address_type!,
                        address: dto.address!,
                        district: dto.district!,
                        province: dto.province!,
                        postal_code: dto.postal_code!,
                        country: dto.country!,
                        contact_person: dto.contact_person!,
    };
}

    toPrismaUpdateInput(dto: CreateAddressDto): Prisma.employee_addressUpdateInput {
        return {
                        address_type: dto.address_type!,
                        address: dto.address!,
                        district: dto.district!,
                        province: dto.province!,
                        postal_code: dto.postal_code!,
                        country: dto.country!,
                        contact_person: dto.contact_person!,
        };
    }
}