import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateDeliveryHeaderDto, UpdateDeliveryHeaderDto } from './dto/delivery-header.dto';
import { CreateDeliveryLineDto, UpdateDeliveryLineDto } from './dto/delivery-line.dto';
import { DeliveryHeaderRepository } from './repository/delivery-header.repository';
import { DeliveryLineRepository } from './repository/delivery-line.repository';
import { DeliveryHeaderMapper } from './mapper/delivery-header.mapper';
import { DeliveryLineMapper } from './mapper/delivery-line.mapper';

@Injectable()
export class DeliveryService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly deliveryHeaderRepository: DeliveryHeaderRepository,
        private readonly deliveryLineRepository: DeliveryLineRepository,
    ) { }

     async create(
        createDeliveryHeaderDto: CreateDeliveryHeaderDto,
    ) {
        try {
            return await this.prismaService.$transaction(
                async (prisma) => {

                    // Generate document number
                    const delivery_no =
                        await this.documentNumberService.generate({
                            module_code: 'DLIVERY',
                            document_type_code: 'DLIVERY',
                            branch_id: 0,
                        });

                    // Header mapper
                    const deliveryHeaderData =
                        DeliveryHeaderMapper.toPrismaCreateInput(
                            createDeliveryHeaderDto,
                            delivery_no,
                        );

                    // Create header
                    const deliveryHeader =
                        await this.deliveryHeaderRepository.create(
                            prisma,
                            deliveryHeaderData,
                        );

                    // Create lines
                    if (
                        createDeliveryHeaderDto.deliveryLines &&
                        createDeliveryHeaderDto.deliveryLines.length > 0
                    ) {
                        for (const line of createDeliveryHeaderDto.deliveryLines) {

                            const lineData =
                                DeliveryLineMapper.toPrismaCreateInput(
                                    line,
                                    deliveryHeader.delivery_id,
                                );

                            await this.deliveryLineRepository.create(
                                prisma,
                                lineData,
                            );
                        }
                    }

                    // Return complete document
                    const createdDelivery =
                        await prisma.delivery_header.findUnique({
                            where: {
                                delivery_id:
                                    deliveryHeader.delivery_id,
                            },
                            include: {
                                deliveryLines: true,
                            },
                        });

                    if (!createdDelivery) {
                        throw new Error(
                            'Delivery header not found after creation',
                        );
                    }

                    return createdDelivery;
                },
            );
        } catch (error) {

            if (error instanceof Error) {
                throw new Error(
                    `Error creating delivery: ${error.message}`,
                );
            }

            throw error;
        }
    }

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
