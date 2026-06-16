import { Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { CreateTransferOutHeaderDto } from './dto/create-transfer-out-header.dto';
import { CreateTransferOutLineDto } from './dto/create-transfer-out-line.dto';
import { CreateTransferOutHeaderMapper } from './mapper/create-transfer-out-herder.mapper';
import { CreateTransferOutLineMapper } from './mapper/create-transfer-out-line.mapper';
import { CreateTransferOutHeaderRepository } from './repository/create-transfer-out-herder.repository';
import {CreateTransferOutLineRepository } from './repository/create-transfer-out-line.repository';

@Injectable()
export class TransferOutService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createTransferOutHeaderRepository: CreateTransferOutHeaderRepository,
        private readonly createTransferOutLineRepository: CreateTransferOutLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
    ) {}

    async create(createTransferOutHeaderDto: CreateTransferOutHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const transfer_out_no = await this.documentNumberService.generate({
                    module_code: 'TO',
                    document_type_code: 'TO',
                    branch_id: createTransferOutHeaderDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createTransferOutHeaderDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createTransferOutHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createTransferOutHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. สร้าง Header
                const headerData = CreateTransferOutHeaderMapper.toPrismaCreateInput(
                    createTransferOutHeaderDto,
                    transfer_out_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createTransferOutHeaderRepository.create(tx, headerData);

                // 4. บันทึกรายการ Lines และอัปเดต Stock Movement
                for (const line of createTransferOutHeaderDto.lines) {
                    const lineData = CreateTransferOutLineMapper.toPrismaCreateInput(line, (header as any).transfer_out_id);
                    await this.createTransferOutLineRepository.create(tx, lineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'TO',
                        doc_type_no: doc_type_no,
                        item_uom_id: line.uom_id,
                        ref_doc_no: transfer_out_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty),
                    });
                }

                // 5. ส่งข้อมูลผลลัพธ์กลับไป 
                return await (tx as any).transfer_out_header.findUnique({
                    where: { transfer_out_id: (header as any).transfer_out_id },
                    include: { transferOutLines: true },
                });

            }
            catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Transfer Out: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll() {
        return await this.prismaService.transfer_out_header.findMany({
            include: { transferOutLines: true },
        });
    }

    async findPendingOut() {
        return await this.prismaService.appv_transfer_header.findMany({
            where: { status: 'APPROVED' },
            include: { appvTransferLines: true },
        });
    }

    async findOne(id: number) {
        return await this.prismaService.transfer_out_header.findUnique({
            where: { transfer_out_id: id },
            include: { transferOutLines: true },
        });
    }


    
}
