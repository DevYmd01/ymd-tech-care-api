// delivery-line.repository.ts

import { Injectable } from '@nestjs/common';
import {
    Prisma,
    delivery_line,
} from '@prisma/client';

@Injectable()
export class DeliveryLineRepository {

    async create(
        prisma: Prisma.TransactionClient,
        data: Prisma.delivery_lineCreateInput,
    ): Promise<delivery_line> {

        return prisma.delivery_line.create({
            data,
        });
    }

    async update(
        prisma: Prisma.TransactionClient,
        delivery_line_id: number,
        data: Prisma.delivery_lineUpdateInput,
    ): Promise<delivery_line> {

        return prisma.delivery_line.update({
            where: {
                delivery_line_id,
            },
            data,
        });
    }

    async findById(
        prisma: Prisma.TransactionClient,
        delivery_line_id: number,
    ): Promise<delivery_line | null> {

        return prisma.delivery_line.findUnique({
            where: {
                delivery_line_id,
            },
        });
    }

    async findByDeliveryId(
        prisma: Prisma.TransactionClient,
        delivery_id: number,
    ): Promise<delivery_line[]> {

        return prisma.delivery_line.findMany({
            where: {
                delivery_id,
            },
            orderBy: {
                delivery_line_id: 'asc',
            },
        });
    }

    async delete(
        prisma: Prisma.TransactionClient,
        delivery_line_id: number,
    ): Promise<delivery_line> {

        return prisma.delivery_line.delete({
            where: {
                delivery_line_id,
            },
        });
    }

    async deleteByDeliveryId(
        prisma: Prisma.TransactionClient,
        delivery_id: number,
    ) {

        return prisma.delivery_line.deleteMany({
            where: {
                delivery_id,
            },
        });
    }
}