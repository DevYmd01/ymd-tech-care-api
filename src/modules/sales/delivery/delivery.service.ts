import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DeliveryService {
    constructor(private readonly prismaService: PrismaService) {}

    async getPendingDeliveries() {
        return this.prismaService.sale_order_header.findMany({
            where: {
                status: 'APPROVED',
            },
            include: {
                customer: true,
            },
        });
    }   
}
