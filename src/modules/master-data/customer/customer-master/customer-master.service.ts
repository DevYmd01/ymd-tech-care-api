import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCustomerMasterDto } from './dto/create-customer-master.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerMasterRepository } from './repository/create-customer-master.repository';
import { CreateCustomerAddressRepository } from './repository/create-customer-address.repository';
import { CreateCustomerMasterMapper } from './mapper/create-customer-master.mapper';
import { CreateCustomerAddressMapper } from './mapper/create-csustomer-address.mapper';
import { Prisma, customer_address } from '@prisma/client';
import { UpdateCustomerMasterDto } from './dto/update-customer-master.dto';
import { UpdateCustomerMasterRepository } from './repository/update-customer-master.repository';
import { UpdateCustomerAddressRepository } from './repository/update-customer-address.repository';
import { UpdateCustomerMasterMapper } from './mapper/update-customer-master.mapper';
import { UpdateCustomerAddressMapper } from './mapper/update-customer-address.mapper';
import { diffById } from '@/common/utils/diff-by-id';
import { DeleteCustomerAddressRepository } from './repository/delete-customer-address.repository';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto';

@Injectable()
export class CustomerMasterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly createCustomerMasterRepository: CreateCustomerMasterRepository,
    private readonly createCustomerAddressRepository: CreateCustomerAddressRepository,
    private readonly updateCustomerMasterRepository: UpdateCustomerMasterRepository,
    private readonly updateCustomerAddressRepository: UpdateCustomerAddressRepository,
    private readonly deleteCustomerAddressRepository: DeleteCustomerAddressRepository,
  ) {}

  async create(dto: CreateCustomerMasterDto, context: any) {
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
        customerAddresses: {
          where: { is_active: true },
        },
      },
    });
  }

async update(id: number, dto: UpdateCustomerMasterDto, context: any) {
  return this.prismaService.$transaction(async (tx) => {

    const existingCustomer = await tx.customer.findUnique({
      where: { customer_id: id },
      include: { customerAddresses: true },
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    // validate default
    if (dto.addresses) {
      const defaultAddresses = dto.addresses.filter(a => a.is_default);
      if (defaultAddresses.length > 1) {
        throw new BadRequestException('Default address must be only one');
      }
    }

    const customerData = UpdateCustomerMasterMapper.toPrismaUpdateInput(dto);

    await this.updateCustomerMasterRepository.update(tx, id, customerData);

    if (dto.addresses) {

      // reset default
      await tx.customer_address.updateMany({
        where: { customer_id: id },
        data: { is_default: false },
      });

      const { toCreate, toUpdate, toDelete } = diffById(
        existingCustomer.customerAddresses,
        dto.addresses,
        'customer_address_id'
      );

      // delete (soft)
      if (toDelete.length > 0) {
        await tx.customer_address.updateMany({
          where: {
            customer_address_id: { in: toDelete.map(a => a.customer_address_id) }
          },
          data: { is_active: false }
        });
      }

      // update (parallel)
      await Promise.all(
        toUpdate.map((addressDto) => {
          if (!addressDto.customer_address_id) return;

          const updateData =
            UpdateCustomerAddressMapper.toPrismaUpdateInput(addressDto);

          return tx.customer_address.update({
            where: { customer_address_id: addressDto.customer_address_id },
            data: updateData,
          });
        })
      );

      // create
      if (toCreate.length > 0) {
        const newAddressesData = toCreate.map((addressDto) =>
          CreateCustomerAddressMapper.toPrismaCreateInput(addressDto, id)
        );

        await tx.customer_address.createMany({
          data: newAddressesData,
        });
      }
    }

    return tx.customer.findUnique({
      where: { customer_id: id },
      include: { customerAddresses:{
            where: { is_active: true }
      } },
    });
  });
}
}