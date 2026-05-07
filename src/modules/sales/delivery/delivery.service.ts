import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DeliveryService {
    constructor(private readonly prismaService: PrismaService) {}
    
    async findAll() {
        return this.prismaService.delivery_header.findMany({
            include: {
                deliveryLines: true,
            },
        });
    }

    async getPendingDeliveries() {
        return this.prismaService.sale_order_header.findMany({
            where: {
                status: {
                    in: ['APPROVED'],
                },
                deliveryHeaders: {
                     none: {},
                }
            },
            include: {
                customer: true,
            },
        });
    }   

    async getPendingDeliveriesBySoId(so_id: number) {
        return this.prismaService.sale_order_header.findMany({
            where: {
                so_id: so_id,
            },
            include: {
                customer: true,
                saleOrderLines: true,
            },
        });
    }   

}
