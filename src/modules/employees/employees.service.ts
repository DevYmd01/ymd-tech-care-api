import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/creact-address.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { EmployeesRepository } from './repository/employees.repository';
import { AddressRepository } from './repository/address.repository';
import { EmployeesMapper } from './mapper/employees.mapper';
import { AddressMapper } from './mapper/address.mapper';
import { Prisma } from '@prisma/client';
import { diffById } from '@/common/utils';

@Injectable()
export class EmployeesService {
    constructor(
        private prisma: PrismaService, // Keep PrismaService for other methods not yet refactored
        private readonly employeesRepository: EmployeesRepository,
        private readonly employeesMapper: EmployeesMapper,
        private readonly addressRepository: AddressRepository,
        private readonly addressMapper: AddressMapper,
    ) { }

    async create(dto: CreateEmployeesDto) {
        try {
            return this.prisma.$transaction(async (tx) => {
                const employeeData = this.employeesMapper.toPrismaCreateInput(dto);

                const employee = await this.employeesRepository.create(tx, employeeData);

                if (dto.addresses?.length) {
                    await Promise.all(
                        dto.addresses.map(addr => {
                            const addressData = this.addressMapper.toPrismaCreateInput(addr, employee.employee_id);
                            return this.addressRepository.create(tx, addressData);
                        })
                    );
                }

                return employee;
            });
        } catch (error: any) {
            if (error?.code === 'P2002') {
                const field = error.meta?.target?.join(', ') || 'Unique field';
                throw new BadRequestException(`${field} already exists`);
            }

            throw error;
        }
    }


async update(id: number, dto: UpdateEmployeesDto) {
    return this.prisma.$transaction(async (tx) => {
        // 1. ดึงข้อมูลเดิม
        const existingEmployee = await tx.employees.findUnique({
            where: { employee_id: id },
            include: { employeeAddresses: true },
        });

        if (!existingEmployee) {
            throw new BadRequestException(`Employee with ID ${id} not found.`);
        }

        // 2. update employee
        const employeeData = this.employeesMapper.toPrismaUpdateInput(dto);
        const updatedEmployee = await this.employeesRepository.update(tx, id, employeeData);

        // 3. handle addresses
        if (Array.isArray(dto.addresses)) {
            const oldAddresses = existingEmployee.employeeAddresses;

            const { toCreate, toUpdate, toDelete } = diffById(
                oldAddresses,
                dto.addresses,
                'employee_address_id'
            );

            // ✅ CREATE
            await Promise.all(
                toCreate.map(addr => {
                    return this.addressRepository.create(
                        tx,
                        this.addressMapper.toPrismaCreateInput(addr, id)
                    );
                })
            );

            // ✅ UPDATE
            await Promise.all(
                toUpdate.map(addr => {
                    if (!addr.employee_address_id) {
                        throw new BadRequestException('Missing employee_address_id for update');
                    }

                    return this.addressRepository.update(
                        tx,
                        addr.employee_address_id,
                        this.addressMapper.toPrismaUpdateInput(addr)
                    );
                })
            );

            // ✅ DELETE
            await Promise.all(
                toDelete.map(addr => {
                    if (!addr.employee_address_id) {
                        throw new BadRequestException('Missing employee_address_id for delete');
                    }

                    return this.addressRepository.delete(
                        tx,
                        addr.employee_address_id
                    );
                })
            );
        }

        return updatedEmployee;
    });
}


    findAll() {
        return this.prisma.employees.findMany({
            include: {
                employeeAddresses: true,
                department: true,
                position: true,
                branch: true,
            },
        });
    }

    findOne(id: number) {
        return this.prisma.employees.findUnique({
            where: { employee_id: id },
            include: {
                employeeAddresses: true,
                department: true,
                position: true,
                branch: true,
            },
        });
    }

    findAllSale() {
        return this.prisma.employees.findMany({
            where: {
                emp_type: "S",
                // employee_status: "ACTIVE",
            },
            include: {
                employeeAddresses: true,
                department: true,
                position: true,
                branch: true,
            },
        });
    }

}
