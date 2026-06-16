import { Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { CreateGrnHeaderDto } from './dto/create-grn-header.dto';
import { CreateGrnLineDto } from './dto/create-grn-line.dto';
import { CreateGrnHeaderMapper } from './mapper/create-grn-header.mapper';
import { CreateGrnLineMapper } from './mapper/create-grn-line.mapper';
import { CreateGrnHeaderRepository } from './repository/create-grn-header.repository';
import {CreateGrnLineRepository } from './repository/create-grn-line.repository';

import { UpdateGrnHeaderDto } from './dto/update-grn-header.dto';
import { UpdateGrnLineDto } from './dto/update-grn-line.dto';
import { UpdateGrnHeaderMapper } from './mapper/update-grn-header.mapper';
import { UpdateGrnLineMapper } from './mapper/update-grn-line.mapper';
import { UpdateGrnHeaderRepository } from './repository/update-grn-header.repository';
import { UpdateGrnLineRepository } from './repository/update-grn-line.repository';

@Injectable()
export class GrnService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createGrnHeaderRepository: CreateGrnHeaderRepository,
        private readonly createGrnLineRepository: CreateGrnLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
        private readonly updateGrnHeaderRepository: UpdateGrnHeaderRepository,
        private readonly updateGrnLineRepository: UpdateGrnLineRepository
    ) {}

    async create(createGrnHeaderDto: CreateGrnHeaderDto, request: any) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                const isCancelled = createGrnHeaderDto.status === 'REJECTED';

                // 1. สร้างเลขที่เอกสาร GRN
                const grn_no = await this.documentNumberService.generate({
                    module_code: 'GRN',
                    document_type_code: 'GRN',
                    branch_id: createGrnHeaderDto.branch_id || 0,
                });

                // 2. สร้าง Header
                const headerData = CreateGrnHeaderMapper.toPrismaCreateInput(
                    createGrnHeaderDto,
                    grn_no
                );
                const header = await this.createGrnHeaderRepository.create(tx, headerData);

                // 3. บันทึก Lines และอัปเดตสต็อก
                let line_no = 1;
                for (const line of createGrnHeaderDto.grn_lines) {
                    const lineData = CreateGrnLineMapper.toPrismaCreateInput(
                        line,
                        (header as any).grn_id,
                        line_no
                    );
                    await this.createGrnLineRepository.create(tx, lineData);

                    // ตัด/เพิ่ม สต็อกผ่าน InventoryOrchestratorService
                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'GRN',
                        doc_type_no: 0, // หรือใส่ตาม doc_type_no ที่ตั้งไว้
                        item_uom_id: line.uom_id,
                        ref_doc_no: grn_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty_received), // อัปเดตสต็อกด้วยจำนวนที่รับเข้าจริง
                    });

                    // 3.1 อัปเดตสถานะและยอดรับเข้าที่บรรทัดของ PO Approval
                    if (createGrnHeaderDto.po_approval_id && line.po_line_id) {
                        const poApprovalLine = await tx.po_approval_line.findFirst({
                            where: {
                                approval_id: createGrnHeaderDto.po_approval_id,
                                po_line_id: line.po_line_id,
                            },
                        });

                        if (poApprovalLine) {
                            const currentReceiptQty = Number(poApprovalLine.receipt_qty || 0);
                            const newReceiptQty = currentReceiptQty + Number(line.qty_received);
                            const approvedQty = Number(poApprovalLine.approved_qty || 0);
                            const rejectedQty = Number(poApprovalLine.rejected_qty || 0);
                            
                            // คำนวณยอดค้างรับ
                            const remainingQty = approvedQty - newReceiptQty - rejectedQty;

                            // กำหนดสถานะ หากไม่ได้ถูก CLOSED ไปแล้ว
                            let newStatus = poApprovalLine.status;
                            if (newStatus !== 'CLOSED') {
                                if (newReceiptQty >= approvedQty) {
                                    newStatus = 'FULLY_RECEIVED';
                                } else if (newReceiptQty > 0) {
                                    newStatus = 'PARTIAL_RECEIVED';
                                } else {
                                    newStatus = 'PENDING';
                                }
                            }

                            await tx.po_approval_line.update({
                                where: { approval_line_id: poApprovalLine.approval_line_id },
                                data: {
                                    receipt_qty: newReceiptQty,
                                    remaining_qty: remainingQty < 0 ? 0 : remainingQty,
                                    status: newStatus,
                                },
                            });
                        }
                    }

                    line_no++;
                }

                // 3.2 อัปเดตสถานะการรับสินค้าของ PO Approval (Header)
                if (createGrnHeaderDto.po_approval_id) {
                    const allApprovalLines = await tx.po_approval_line.findMany({
                        where: { approval_id: createGrnHeaderDto.po_approval_id },
                    });

                    if (allApprovalLines.length > 0) {
                        const allCompleted = allApprovalLines.every(
                            (l) => l.status === 'FULLY_RECEIVED' || l.status === 'CLOSED'
                        );
                        const anyReceived = allApprovalLines.some(
                            (l) => l.status === 'PARTIAL_RECEIVED' || l.status === 'FULLY_RECEIVED'
                        );

                        let headerReceiptStatus = 'PENDING';

                        const poApproval = await tx.po_approval.findUnique({
                            where: { approval_id: createGrnHeaderDto.po_approval_id },
                        });

                        // อัปเดตเฉพาะเมื่อเอกสารไม่ได้ถูกปิดการทำงานไปแล้ว
                        if (poApproval && poApproval.receipt_status !== 'CLOSED') {
                            if (allCompleted) {
                                headerReceiptStatus = 'FULLY_RECEIVED';
                            } else if (anyReceived) {
                                headerReceiptStatus = 'PARTIAL_RECEIVED';
                            }

                            await tx.po_approval.update({
                                where: { approval_id: createGrnHeaderDto.po_approval_id },
                                data: {
                                    receipt_status: headerReceiptStatus,
                                },
                            });
                        }
                    }
                }

                // 4. ส่งข้อมูลผลลัพธ์กลับไป
                return await (tx as any).grn_header.findUnique({
                    where: { grn_id: (header as any).grn_id },
                    include: { grnLines: true },
                });
            }
            catch (error) { 
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create GRN: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll() {
        return await this.prismaService.grn_header.findMany({
            include: { grnLines: true },
        });
    }       


    async pendingGrn() {
        return await this.prismaService.po_approval.findMany({
            where: {
                status: 'APPROVED', // แสดงเฉพาะใบสั่งซื้อที่อนุมัติแล้ว (ไม่รวม DRAFT, CANCELED)
                receipt_status: {
                    in: ['PENDING', 'PARTIAL_RECEIVED'], // ไม่แสดงที่รับครบแล้ว (FULLY_RECEIVED) หรือปิดงาน (CLOSED)
                },
            },
            include: { 
                poApprovalLines: {
                    where: {
                        status: {
                            in: ['PENDING', 'PARTIAL_RECEIVED'], // แสดงเฉพาะบรรทัดที่ยังค้างรับ
                        },
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        return await this.prismaService.grn_header.findUnique({
            where: { grn_id: id },
            include: { grnLines: true },
        });
    }



    // async update(id: number, updateGrnHeaderDto: UpdateGrnHeaderDto, request: any) {
    //    return this.prismaService.$transaction(async (tx) => {
    //         try {
    //         }
    //         catch (error) {
    //         }
    //     });
    // }







}
