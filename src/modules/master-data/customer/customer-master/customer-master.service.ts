import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCustomerMasterDto } from './dto/create-customer-master.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerMasterRepository } from './repository/create-customer-master.repository';
import { CreateCustomerAddressRepository } from './repository/create-customer-address.repository';
import { CreateCustomerMasterMapper } from './mapper/create-customer-master.mapper';
import { CreateCustomerAddressMapper } from './mapper/create-csustomer-address.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerMasterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly createCustomerMasterRepository: CreateCustomerMasterRepository,
    private readonly createCustomerAddressRepository: CreateCustomerAddressRepository,
  ) {}

  async create(dto: CreateCustomerMasterDto) {
    return this.prismaService.$transaction(async (tx) => {
      try {
        // ✅ 1. business validation
        if (dto.addresses && dto.addresses.length > 0) {
          const defaultAddresses = dto.addresses.filter(a => a.is_default);
          if (defaultAddresses.length > 1) {
            throw new BadRequestException('Default address must be only one');
          }
        }

        // ✅ 2. map customer
        const customerData =
          CreateCustomerMasterMapper.toPrismaCreateInput(dto);

        // ✅ 3. create customer
        const customer =
          await this.createCustomerMasterRepository.create(tx, customerData);

        let addressDataList: Prisma.customer_addressCreateManyInput[] = [];

        // ✅ 4. prepare address list
        if (dto.addresses && dto.addresses.length > 0) {
          addressDataList = dto.addresses.map((addressDto) =>
            CreateCustomerAddressMapper.toPrismaCreateInput(
              addressDto,
              customer.customer_id,
            ),
          );

          // ✅ 5. bulk insert
          await this.createCustomerAddressRepository.createMany(
            tx,
            addressDataList,
          );
        }

        // ✅ 6. return result (ลด query)
        return {
          ...customer,
          customerAddresses: addressDataList,
        };
      } catch (error: any) {
        // ✅ 7. handle prisma error
        if (error.code === 'P2002') {
          throw new BadRequestException('Customer code already exists');
        }
        throw error;
      }
    });
  }

  async findAll() {
    return this.prismaService.customer.findMany({
      where: { is_active: true },
      include: {
        customerAddresses: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.customer.findUnique({
      where: { customer_id: id },
      include: {
        customerAddresses: true,
      },
    });
  }
}