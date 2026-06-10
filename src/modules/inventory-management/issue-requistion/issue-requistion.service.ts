import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateIssueRequistionHeaderDto } from './dto/create-issue-requistion-header.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateIssueRequistionHeaderRepository } from './repository/create-issue-requistion-header.repository';
import { CreateIssueRequistionLineRepository } from './repository/create-issue-requistion-line.repository';
import { CreateIssueRequistionHeaderMapper } from './mapper/create-issue-requistion-header.mapper';
import { CreateIssueRequistionLineMapper } from './mapper/create-issue-requistion-line.mapper';
import { LotBalanceService } from '@/common/inventory/lot-balance/lot-balance.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';

import { diffById } from '@/common/utils';

import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { UpdateIssueRequistionHeaderDto } from './dto/update-issue-requistion-header.dto';
import { UpdateIssueRequistionHeaderRepository } from './repository/update-issue-requistion-header.repository';
import { UpdateIssueRequistionLineMapper } from './mapper/update-issue-requistion-line.mapper';
import { UpdateIssueRequistionHeaderMapper } from './mapper/update-issue-requistion-header.mapper';
import { UpdateIssueRequistionLineRepository } from './repository/update-issue-requistion-line.repository';


@Injectable()
export class IssueRequistionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createIssueRequistionHeaderRepository: CreateIssueRequistionHeaderRepository,
        private readonly createIssueRequistionLineRepository: CreateIssueRequistionLineRepository,
        private readonly lotBalanceService: LotBalanceService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
        private readonly updateIssueRequistionHeaderRepository: UpdateIssueRequistionHeaderRepository,
        private readonly updateIssueRequistionLineRepository: UpdateIssueRequistionLineRepository,
        private readonly updateIssueRequistionHeaderMapper: UpdateIssueRequistionHeaderMapper,
        private readonly updateIssueRequistionLineMapper: UpdateIssueRequistionLineMapper,

    ) { }

    async create(createIssueRequistionDto: CreateIssueRequistionHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const issue_req_no = await this.documentNumberService.generate({
                    module_code: 'ISSUE_REQ',
                    document_type_code: 'ISSUE_REQ',
                    branch_id: createIssueRequistionDto.branch_id || 0,
                });

                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createIssueRequistionDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createIssueRequistionDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createIssueRequistionDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 2. แปลงข้อมูลและสร้าง Header
                const headerData = CreateIssueRequistionHeaderMapper.toPrismaCreateInput(
                    createIssueRequistionDto,
                    issue_req_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,

                );
                
                const header = await this.createIssueRequistionHeaderRepository.create(tx, headerData);

                // 3. จัดการข้อมูลรายการ (Lines)
                if (createIssueRequistionDto.lines && createIssueRequistionDto.lines.length > 0) {
                    for (const line of createIssueRequistionDto.lines) {
                        // บันทึก Line ลงฐานข้อมูล
                        const lineData = CreateIssueRequistionLineMapper.toPrismaCreateInput(
                            line,
                            header.issue_req_id,
                        );
                        await this.createIssueRequistionLineRepository.create(tx, lineData);

                        // 4. บันทึก Stock Movement ผ่าน Inventory Orchestrator
                        await this.inventoryOrchestratorService.process(tx, {
                            system_document_code: 'ISSUE_REQ', // กำหนด code สำหรับระบบสต็อก
                            doc_type_no: doc_type_no,
                            item_uom_id: line.uom_id,
                            ref_doc_no: issue_req_no,
                            lot_id: Number(line.lot_id),
                            item_lot_balance_id: Number(line.lot_balance_id),
                            qty: Number(line.qty),
                        });
                    }
                }

                // 5. ดึงข้อมูลที่สร้างเสร็จสมบูรณ์กลับมาแสดงผล
                return await tx.issue_requistion_header.findUnique({
                    where: { issue_req_id: header.issue_req_id },
                    include: { issueRequistionLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Issue Requisition: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll() {
        return this.prismaService.issue_requistion_header.findMany({
            include: { issueRequistionLines: true },
        });
    }

    async findOne(id: number) {
        const issue_req_id = Number(id);
        return this.prismaService.issue_requistion_header.findUnique({
            where: { issue_req_id },
            include: { issueRequistionLines: true },
        });
    }

    async update(id: number, updateIssueRequistionDto: UpdateIssueRequistionHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. ตรวจสอบว่ามีข้อมูล Header อยู่จริงหรือไม่
                const existingHeader = await tx.issue_requistion_header.findUnique({
                    where: { issue_req_id: id },
                    include: { issueRequistionLines: true },
                });

                if (!existingHeader) {
                    throw new BadRequestException(`Issue Requisition ID ${id} not found`);
                }

                // ค้นหาการตั้งค่า IC จาก doc_link_ic (ใช้ ID ใหม่จาก DTO หรือ ID เดิมจาก Header)
                let stock_effect_ic: number | null = existingHeader.stock_effect_ic;
                let doc_type_no = 0;
                let doc_type_name = '';
                const targetDocLinkId = updateIssueRequistionDto.doc_link_ic_id || existingHeader.doc_link_ic_id;
                
                if (targetDocLinkId) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: targetDocLinkId },
                    });
                    if (docLinkIc) {
                        stock_effect_ic = docLinkIc.stock_effect_ic;
                        doc_type_no = Number(docLinkIc.doc_type_no || 0);
                        doc_type_name = docLinkIc.doc_type_name || '';
                    }
                }

                // 2. อัปเดตข้อมูล Header
                const updateHeaderData = UpdateIssueRequistionHeaderMapper.toPrismaUpdateInput(
                    updateIssueRequistionDto,
                    existingHeader.issue_req_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name
                );
                await this.updateIssueRequistionHeaderRepository.update(tx, id, updateHeaderData);

                // 3. จัดการรายการ (Lines) โดยใช้ diffById
                const existingLines = existingHeader.issueRequistionLines || [];
                const diff = diffById(existingLines, updateIssueRequistionDto.lines || [], 'issue_req_line_id');

                // 4. ลบรายการ (Delete) และคืนสต็อก
                for (const line of diff.toDelete) {
                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'ISSUE_REQ',
                        doc_type_no: doc_type_no,
                        item_uom_id: (line as any).uom_id,
                        ref_doc_no: existingHeader.issue_req_no,
                        lot_id: Number((line as any).lot_id),
                        item_lot_balance_id: Number((line as any).lot_balance_id),
                        qty: -Number((line as any).qty), // ส่งค่าติดลบเพื่อคืนสต็อก
                    });

                    await tx.issue_requistion_line.delete({
                        where: { issue_req_line_id: (line as any).issue_req_line_id },
                    });
                }

                // 5. อัปเดตรายการเดิม (Update) และปรับปรุงสต็อก
                for (const line of diff.toUpdate) {
                    const oldLine = existingLines.find((l: any) => l.issue_req_line_id === line.issue_req_line_id);
                    if (oldLine) {
                        // คืนสต็อกเก่าก่อน
                        await this.inventoryOrchestratorService.process(tx, {
                            system_document_code: 'ISSUE_REQ',
                            doc_type_no: doc_type_no,
                            item_uom_id: (oldLine as any).uom_id,
                            ref_doc_no: existingHeader.issue_req_no,
                            lot_id: Number((oldLine as any).lot_id),
                            item_lot_balance_id: Number((oldLine as any).lot_balance_id),
                            qty: -Number((oldLine as any).qty),
                        });
                    }

                    // ตัดสต็อกใหม่ตามจำนวนที่แก้ไข
                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'ISSUE_REQ',
                        doc_type_no: doc_type_no,
                        item_uom_id: (line as any).uom_id,
                        ref_doc_no: existingHeader.issue_req_no,
                        lot_id: Number((line as any).lot_id),
                        item_lot_balance_id: Number((line as any).lot_balance_id),
                        qty: Number((line as any).qty),
                    });

                    const updateLineData = UpdateIssueRequistionLineMapper.toPrismaUpdateInput(line as any, id);
                    await this.updateIssueRequistionLineRepository.update(tx, (line as any).issue_req_line_id, updateLineData);
                }

                // 6. เพิ่มรายการใหม่ (Create) และตัดสต็อก
                for (const line of diff.toCreate) {
                    const createLineData = CreateIssueRequistionLineMapper.toPrismaCreateInput(line as any, id);
                    await this.createIssueRequistionLineRepository.create(tx, createLineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'ISSUE_REQ',
                        doc_type_no: doc_type_no,
                        item_uom_id: (line as any).uom_id,
                        ref_doc_no: existingHeader.issue_req_no,
                        lot_id: Number((line as any).lot_id),
                        item_lot_balance_id: Number((line as any).lot_balance_id),
                        qty: Number((line as any).qty),
                    });
                }

                return await tx.issue_requistion_header.findUnique({
                    where: { issue_req_id: id },
                    include: { issueRequistionLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to update Issue Requisition: ${error.message}`);
                }
                throw error;
            }
        });
    }
}
