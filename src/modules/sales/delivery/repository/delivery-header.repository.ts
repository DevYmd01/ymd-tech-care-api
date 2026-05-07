// delivery-header.repository.ts

import { Injectable } from '@nestjs/common';
import {
    Prisma,
    delivery_header,
} from '@prisma/client';

@Injectable()
export class DeliveryHeaderRepository {

    async create(
        prisma: Prisma.TransactionClient,
        data: Prisma.delivery_headerCreateInput,
    ): Promise<delivery_header> {

        return prisma.delivery_header.create({
            data,
        });
    }

    async update(
        prisma: Prisma.TransactionClient,
        delivery_id: number,
        data: Prisma.delivery_headerUpdateInput,
    ): Promise<delivery_header> {

        return prisma.delivery_header.update({
            where: {
                delivery_id,
            },
            data,
        });
    }

    async findById(
        prisma: Prisma.TransactionClient,
        delivery_id: number,
    ): Promise<delivery_header | null> {

        return prisma.delivery_header.findUnique({
            where: {
                delivery_id,
            },
        });
    }

    async delete(
        prisma: Prisma.TransactionClient,
        delivery_id: number,
    ): Promise<delivery_header> {

        return prisma.delivery_header.delete({
            where: {
                delivery_id,
            },
        });
    }
}