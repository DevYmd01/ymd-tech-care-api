import { Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { CreateTransferHeaderDto } from './dto/create-transfer-req-header.dto';
import { CreateTransferLineDto } from './dto/create-transfer-req-line.dto';
import { CreateTransferReqHeaderMapper } from './mapper/create-transfer-req-header.mapper';
import { CreateTransferReqLineMapper } from './mapper/create-transfer-req-line.mapper';
import { CreateTransferReqHeaderRepository } from './repository/create-transfer-req-header.repository';
import { CreateTransferReqLineRepository } from './repository/create-transfer-req-line.repository';

import { UpdateTransferHeaderDto } from './dto/update-transfer-req-header.dto';
import { UpdateTransferLineDto } from './dto/update-transfer-req-line.dto';
import { UpdateTransferReqHeaderMapper } from './mapper/update-transfer-req-header.mapper';
import { UpdateTransferReqLineMapper } from './mapper/update-transfer-req-line.mapper';
import { UpdateTransferReqHeaderRepository } from './repository/update-transfer-req-header.repository';
import { UpdateTransferReqLineRepository } from './repository/update-transfer-req-line.repository';

import { SearchTransferDto } from './dto/search.dto';



@Injectable()
export class TransferStockService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createTransferReqHeaderRepository: CreateTransferReqHeaderRepository,
        private readonly createTransferReqLineRepository: CreateTransferReqLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
        private readonly updateTransferReqHeaderRepository: UpdateTransferReqHeaderRepository,
        private readonly updateTransferReqLineRepository: UpdateTransferReqLineRepository
    ) {}

    async create(createTransferHeaderDto: CreateTransferHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const transfer_req_no = await this.documentNumberService.generate({
                    module_code: 'TR',
                    document_type_code: 'TR',
                    branch_id: createTransferHeaderDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createTransferHeaderDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createTransferHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createTransferHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. สร้าง Header
                const headerData = CreateTransferReqHeaderMapper.toPrismaCreateInput(
                    createTransferHeaderDto,
                    transfer_req_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createTransferReqHeaderRepository.create(tx, headerData);

                // 4. บันทึกรายการ Lines และอัปเดต Stock Movement
                for (const line of createTransferHeaderDto.lines) {
                    const lineData = CreateTransferReqLineMapper.toPrismaCreateInput(line, header.transfer_req_id);
                    await this.createTransferReqLineRepository.create(tx, lineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'TR',
                        doc_type_no: doc_type_no,
                        item_uom_id: line.uom_id,
                        ref_doc_no: transfer_req_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty),
                    });
                }

                // 5. ส่งข้อมูลผลลัพธ์กลับไป
                return await tx.transfer_requisition_header.findUnique({
                    where: { transfer_req_id: header.transfer_req_id },
                    include: { transferRequisitionLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Transfer Stock: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll(searchTransferDto: SearchTransferDto) {
        const {
            page = 1,
            limit = 20,
            transfer_req_no,
            status,
            transfer_req_id,
        } = searchTransferDto;

        const safeLimit = Math.min(limit, 100);
        const skip = (page - 1) * safeLimit;

        const whereCondition: any = {};

        if (status) {
            whereCondition.status = status;
        }

        if (transfer_req_no) {
            whereCondition.transfer_req_no = {
                contains: transfer_req_no,
            };
        }

        if (transfer_req_id) {
            whereCondition.transfer_req_id = {
                equals: transfer_req_id,
            };
        }

        const [data, total] = await Promise.all([
            this.prismaService.transfer_requisition_header.findMany({
                where: whereCondition,
                skip: skip,
                take: safeLimit,
                include: {
                    transferRequisitionLines: true,
                },
                orderBy: { transfer_req_id: 'desc' },
            }),
            this.prismaService.transfer_requisition_header.count({ where: whereCondition }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit: safeLimit,
                total_pages: Math.ceil(total / safeLimit),
            },
        };
    }

    async findOne(id: number) {
        return this.prismaService.transfer_requisition_header.findUnique({
            where: {
                transfer_req_id: id,
            },
            include: {
                transferRequisitionLines: true,
            },
        });
    }

    async update(transfer_req_id: number, updateTransferHeaderDto: UpdateTransferHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. ค้นหาเอกสารเดิม
                const existingHeader = await tx.transfer_requisition_header.findUnique({
                    where: { transfer_req_id },
                    include: { transferRequisitionLines: true },
                });

                if (!existingHeader) {
                    throw new BadRequestException(`Transfer Stock with ID ${transfer_req_id} not found`);
                }

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic (ถ้ามีการเปลี่ยน)
                let stock_effect_ic: number | null = existingHeader.stock_effect_ic;
                let doc_type_no = existingHeader.doc_type_no;
                let doc_type_name = existingHeader.doc_type_name;

                if (updateTransferHeaderDto.doc_link_ic_id && updateTransferHeaderDto.doc_link_ic_id !== existingHeader.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: updateTransferHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${updateTransferHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. อัปเดต Header
                const headerData = UpdateTransferReqHeaderMapper.toPrismaUpdateInput(
                    updateTransferHeaderDto,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name
                );

                await this.updateTransferReqHeaderRepository.update(tx, transfer_req_id, headerData);

                // 4. จัดการ Lines (เปรียบเทียบข้อมูลใหม่กับข้อมูลเดิม)
                const existingLines = existingHeader.transferRequisitionLines || [];
                const diff = diffById(
                    existingLines,
                    updateTransferHeaderDto.lines as any || [],
                    "transfer_req_line_id",
                );

                // 4.1 ลบรายการที่ถูกเอาออก
                if (diff.toDelete && diff.toDelete.length > 0) {
                    for (const line of diff.toDelete) {
                        await this.updateTransferReqLineRepository.delete(tx, line.transfer_req_line_id);
                        // สามารถเรียก InventoryOrchestrator แบบย้อนหลังที่นี่ได้ ถ้าจำเป็นต้องอัปเดต Stock
                    }
                }

                // 4.2 เพิ่มรายการใหม่
                for (const line of diff.toCreate) {
                    const lineData = CreateTransferReqLineMapper.toPrismaCreateInput(line as CreateTransferLineDto, transfer_req_id);
                    await this.createTransferReqLineRepository.create(tx, lineData);
                }

                // 4.3 อัปเดตรายการเดิม
                for (const line of diff.toUpdate) {
                    const lineData = UpdateTransferReqLineMapper.toPrismaUpdateInput(line as any);
                    await this.updateTransferReqLineRepository.update(tx, line.transfer_req_line_id, lineData);
                }

                // 5. ส่งผลลัพธ์กลับ
                return await tx.transfer_requisition_header.findUnique({
                    where: { transfer_req_id },
                    include: { transferRequisitionLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to update Transfer Stock: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async remove(id: number) {
    }



}
