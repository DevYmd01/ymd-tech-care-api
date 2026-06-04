import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateDeliveryHeaderDto, UpdateDeliveryHeaderDto } from './dto/delivery-header.dto';
import { CreateDeliveryLineDto, UpdateDeliveryLineDto } from './dto/delivery-line.dto';
import { DeliveryHeaderRepository } from './repository/delivery-header.repository';
import { DeliveryLineRepository } from './repository/delivery-line.repository';
import { DeliveryHeaderMapper } from './mapper/delivery-header.mapper';
import { DeliveryLineMapper } from './mapper/delivery-line.mapper';
import { diffById } from '@/common/utils';

import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';


@Injectable()
export class DeliveryService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly deliveryHeaderRepository: DeliveryHeaderRepository,
        private readonly deliveryLineRepository: DeliveryLineRepository,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
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
                            module_code: 'DLVRY',
                            document_type_code: 'DLVRY',
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

                            // 🔹 บันทึกรายการเคลื่อนไหวสต็อก (Stock Movement)
                            await this.inventoryOrchestratorService.process(prisma, {
                                system_document_code: 'DLVRY',
                                doc_type_no: 0,
                                item_uom_id: line.uom_id,
                                ref_doc_no: delivery_no,
                                lot_id: Number(line.lot_id),
                                item_lot_balance_id: Number(line.lot_balance_id),
                                qty: Number(line.qty_shipped),
                            });
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

    async update(
        delivery_id: number,
        updateDeliveryHeaderDto: UpdateDeliveryHeaderDto,
    ) {
        try {
            return await this.prismaService.$transaction(
                async (prisma) => {
                    // 1. Fetch the existing delivery header and its lines
                    const existingDelivery = await prisma.delivery_header.findUnique({
                        where: { delivery_id },
                        include: { deliveryLines: true },
                    });

                    if (!existingDelivery) {
                        throw new Error(`Delivery header with ID ${delivery_id} not found.`);
                    }

                    // 2. Update the delivery header
                    const deliveryHeaderUpdateData = DeliveryHeaderMapper.toPrismaUpdateInput(
                        updateDeliveryHeaderDto,
                    );
                    await this.deliveryHeaderRepository.update(
                        prisma,
                        delivery_id,
                        deliveryHeaderUpdateData,
                    );

                    // 3. Handle delivery lines (create, update, delete)
                    const incomingDeliveryLines = updateDeliveryHeaderDto.deliveryLines || [];

                    // Use diffById to determine which lines to create, update, or delete
                    // Assuming 'delivery_line_id' is the unique identifier for delivery lines
                    const { toCreate, toUpdate, toDelete } = diffById(
                        existingDelivery.deliveryLines,
                        incomingDeliveryLines,
                        'delivery_line_id',
                    );

                    // 🔹 7. ลบรายการที่ถูกเอาออก (Reverse สต็อกเดิมออกก่อนลบ)
                    if (toDelete.length > 0) {
                        for (const line of toDelete) {
                            await this.inventoryOrchestratorService.process(prisma, {
                                system_document_code: 'DLVRY',
                                doc_type_no: 0,
                                item_uom_id: (line as any).uom_id,
                                ref_doc_no: existingDelivery.delivery_no,
                                lot_id: Number((line as any).lot_id),
                                item_lot_balance_id: Number((line as any).lot_balance_id),
                                qty: -Number((line as any).qty_shipped),
                            });

                            await this.deliveryLineRepository.delete(
                                prisma,
                                line.delivery_line_id,
                            );
                        }
                    }

                    // 🔹 8. อัปเดตรายการเดิม (Reverse ของเก่า และ Commit ของใหม่)
                    for (const line of toUpdate) {
                        const oldLine = existingDelivery.deliveryLines.find(
                            (l) => l.delivery_line_id === line.delivery_line_id,
                        );

                        if (oldLine) {
                            // Reverse สต็อกเดิมตามค่าเก่า
                            await this.inventoryOrchestratorService.process(prisma, {
                                system_document_code: 'DLVRY',
                                doc_type_no: 0,
                                item_uom_id: (oldLine as any).uom_id,
                                ref_doc_no: existingDelivery.delivery_no,
                                lot_id: Number((oldLine as any).lot_id),
                                item_lot_balance_id: Number((oldLine as any).lot_balance_id),
                                qty: -Number((oldLine as any).qty_shipped),
                            });
                        }

                        // Commit สต็อกใหม่ตามค่าที่แก้ไข
                        await this.inventoryOrchestratorService.process(prisma, {
                            system_document_code: 'DLVRY',
                            doc_type_no: 0,
                            item_uom_id: (line as any).uom_id,
                            ref_doc_no: existingDelivery.delivery_no,
                            lot_id: Number((line as any).lot_id),
                            item_lot_balance_id: Number((line as any).lot_balance_id),
                            qty: Number((line as any).qty_shipped),
                        });

                        const lineUpdateData = DeliveryLineMapper.toPrismaUpdateInput(
                            line as UpdateDeliveryLineDto,
                        );
                        await this.deliveryLineRepository.update(
                            prisma,
                            line.delivery_line_id!,
                            lineUpdateData,
                        );
                    }

                    // 🔹 9. สร้างรายการใหม่ (Commit สต็อกใหม่)
                    for (const line of toCreate) {
                        await this.inventoryOrchestratorService.process(prisma, {
                            system_document_code: 'DLVRY',
                            doc_type_no: 0,
                            item_uom_id: (line as any).uom_id,
                            ref_doc_no: existingDelivery.delivery_no,
                            lot_id: Number((line as any).lot_id),
                            item_lot_balance_id: Number((line as any).lot_balance_id),
                            qty: Number((line as any).qty_shipped),
                        });

                        const lineCreateData = DeliveryLineMapper.toPrismaCreateInput(
                            line as CreateDeliveryLineDto,
                            delivery_id,
                        );
                        await this.deliveryLineRepository.create(prisma, lineCreateData);
                    }

                    // 4. Return the complete updated delivery header with its lines
                    const updatedDelivery = await prisma.delivery_header.findUnique({
                        where: { delivery_id },
                        include: { deliveryLines: true },
                    });

                    if (!updatedDelivery) {
                        // This case should ideally not happen if the update was successful
                        throw new Error(`Failed to retrieve updated delivery header with ID ${delivery_id}.`);
                    }

                    return updatedDelivery;
                }
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error updating delivery: ${error.message}`,
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

    async findOne(delivery_id: number) {
        return this.prismaService.delivery_header.findUnique({
            where: { delivery_id },
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
