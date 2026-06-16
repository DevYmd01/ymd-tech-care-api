import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { CreateTransferInHeaderDto } from './dto/create-transfer-in-header.dto';
import { CreateTransferInLineDto } from './dto/create-transfer-in-line.dto';
import { CreateTransferInHeaderMapper } from './mapper/create-transfer-in-herder.mapper';
import { CreateTransferInLineMapper } from './mapper/create-transfer-in-line.mapper';
import { CreateTransferInHeaderRepository } from './repository/create-transfer-in-herder.repository';
import {CreateTransferInLineRepository } from './repository/create-transfer-in-line.repository';

@Injectable()
export class TransferInService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createTransferInHeaderRepository: CreateTransferInHeaderRepository,
        private readonly createTransferInLineRepository: CreateTransferInLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
    ) {}

    async create(createTransferInHeaderDto: CreateTransferInHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const transfer_in_no = await this.documentNumberService.generate({
                    module_code: 'TI',
                    document_type_code: 'TI',
                    branch_id: createTransferInHeaderDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createTransferInHeaderDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createTransferInHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createTransferInHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. สร้าง Header
                const headerData = CreateTransferInHeaderMapper.toPrismaCreateInput(
                    createTransferInHeaderDto,
                    transfer_in_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createTransferInHeaderRepository.create(tx, headerData);

                // 4. บันทึกรายการ Lines และอัปเดต Stock Movement
                for (const line of createTransferInHeaderDto.lines) {
                    const lineData = CreateTransferInLineMapper.toPrismaCreateInput(line, (header as any).transfer_in_id);
                    await this.createTransferInLineRepository.create(tx, lineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'TI',
                        doc_type_no: doc_type_no,
                        item_uom_id: line.uom_id,
                        ref_doc_no: transfer_in_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty),
                    });
                }

                // 5. ส่งข้อมูลผลลัพธ์กลับไป 
                // (อย่าลืมปรับชื่อตาราง transfer_in_header และ relation name ให้ตรงกับ Prisma schema ปัจจุบันของคุณ)
                return await (tx as any).transfer_in_header.findUnique({
                    where: { transfer_in_id: (header as any).transfer_in_id },
                    include: { transferInLines: true },
                });

            }
            catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Transfer In: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll() {
        return await this.prismaService.transfer_in_header.findMany({
            include: { transferInLines: true },
        });
    }       

    async findPendingIn() {
        return await this.prismaService.appv_transfer_header.findMany({
            where: { status: 'APPROVED' },
            include: { appvTransferLines: true },
        });
    }

    async findOne(id: number) {
        return await this.prismaService.transfer_in_header.findUnique({
            where: { transfer_in_id: id },
            include: { transferInLines: true },
        });
    }





}
