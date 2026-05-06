import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressRepository {
    constructor(private prisma: PrismaService) {}

    async create(tx: Prisma.TransactionClient, data: Prisma.employee_addressCreateInput) {
        return tx.employee_address.create({ data });
    }

async update(
    tx: Prisma.TransactionClient,
    employee_address_id: number,
    data: Prisma.employee_addressUpdateInput
) {
    const result = await tx.employee_address.updateMany({
        where: { employee_address_id },
        data,
    });

    if (result.count === 0) {
        throw new Error(`Address ${employee_address_id} not found`);
    }

    return result;
}

    async delete(tx: Prisma.TransactionClient, employee_address_id: number) {
        return tx.employee_address.delete({
            where: { employee_address_id },
        });
    }
}