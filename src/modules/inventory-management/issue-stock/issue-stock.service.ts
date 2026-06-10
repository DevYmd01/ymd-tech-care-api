import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { CreateIssueStockHeaderDto } from './dto/create-issue-stock-header.dto';
import { CreateIssueStockLineDto } from './dto/create-issue-stock-line.dto';
import { CreateIssueStockHeaderMapper } from './mapper/create-issue-stock-header.mapper';
import { CreateIssueStockLineMapper } from './mapper/create-issue-stock-line.mapper';
import { CreateIssueStockHeaderRepository } from './repository/create-issue-stock-header.repository';
import { CreateIssueStockLineRepository } from './repository/create-issue-stock-line.repository';

import { UpdateIssueStockHeaderDto } from './dto/update-issue-stock-header.dto';
import { UpdateIssueStockLineDto } from './dto/update-issue-stock-line.dto';    
import { UpdateIssueStockHeaderMapper } from './mapper/update-issue-stock-header.mapper';
import { UpdateIssueStockLineMapper } from './mapper/update-issue-stock-line.mapper';
import { UpdateIssueStockHeaderRepository } from './repository/update-issue-stock-header.repository';
import { UpdateIssueStockLineRepository } from './repository/update-issue-stock-line.repository';


@Injectable()
export class IssueStockService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createIssueStockHeaderRepository: CreateIssueStockHeaderRepository,
        private readonly createIssueStockLineRepository: CreateIssueStockLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
        private readonly updateIssueStockHeaderRepository: UpdateIssueStockHeaderRepository,
        private readonly updateIssueStockLineRepository: UpdateIssueStockLineRepository
    ) {}

    async create(createIssueStockDto: CreateIssueStockHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const issue_stock_no = await this.documentNumberService.generate({
                    module_code: 'ISSUE_STOCK',
                    document_type_code: 'ISSUE_STOCK',
                    branch_id: createIssueStockDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createIssueStockDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createIssueStockDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createIssueStockDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. สร้าง Header
                const headerData = CreateIssueStockHeaderMapper.toPrismaCreateInput(
                    createIssueStockDto,
                    issue_stock_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createIssueStockHeaderRepository.create(tx, headerData);

                // 4. บันทึกรายการ Lines และ Stock Movement
                for (const line of createIssueStockDto.lines) {
                    const lineData = CreateIssueStockLineMapper.toPrismaCreateInput(line, header.issue_stock_id);
                    await this.createIssueStockLineRepository.create(tx, lineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'ISSUE_STOCK',
                        doc_type_no: doc_type_no,
                        item_uom_id: line.uom_id,
                        ref_doc_no: issue_stock_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty),
                    });
                }

                return await tx.issue_stock_header.findUnique({
                    where: { issue_stock_id: header.issue_stock_id },
                    include: { issueStockLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Issue Stock: ${error.message}`);
                }
                throw error;
            }
        })
    }

    async findAll() {
        return this.prismaService.issue_stock_header.findMany({
            include: {
                issueStockLines: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prismaService.issue_stock_header.findUnique({
            where: {
                issue_stock_id: id,
            },
            include: {
                issueStockLines: true,
            },
        });
    }

    async findPendingIssueStock() {
        return this.prismaService.appvissue_requistion_header.findMany({
            where: { 
                status: {in:['APPROVED']},
                issueStockHeaders: { none: {}}
         },
            include: {
                appvissueRequistionLines: true,
            },
        });
    }

    async findPendingIssueStockBySoId(appv_issue_req_id: number) {
       return this.prismaService.appvissue_requistion_header.findMany({
            where: { 
                appv_issue_req_id: appv_issue_req_id,
                status: {in:['APPROVED']},
                issueStockHeaders: { none: {}}
         },
            include: {
                appvissueRequistionLines: true,
            },
        });
    } 


    async update(issue_stock_id: number, updateIssueStockDto: UpdateIssueStockHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. ค้นหาเอกสารเดิม
                const existingHeader = await tx.issue_stock_header.findUnique({
                    where: { issue_stock_id },
                    include: { issueStockLines: true },
                });

                if (!existingHeader) {
                    throw new BadRequestException(`Issue Stock with ID ${issue_stock_id} not found`);
                }

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic (ถ้ามีการเปลี่ยน)
                let stock_effect_ic: number | null = existingHeader.stock_effect_ic;
                let doc_type_no = existingHeader.doc_type_no;
                let doc_type_name = existingHeader.doc_type_name;

                if (updateIssueStockDto.doc_link_ic_id && updateIssueStockDto.doc_link_ic_id !== existingHeader.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: updateIssueStockDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${updateIssueStockDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. อัปเดต Header
                const headerData = UpdateIssueStockHeaderMapper.toPrismaUpdateInput(
                    updateIssueStockDto,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name
                );

                await this.updateIssueStockHeaderRepository.update(tx, issue_stock_id, headerData);

                // 4. จัดการ Lines (เปรียบเทียบข้อมูลใหม่กับข้อมูลเดิม)
                const existingLines = existingHeader.issueStockLines || [];
                const diff = diffById(
                    existingLines,
                    updateIssueStockDto.lines as any || [],
                    "issue_stock_line_id",
                );

                // 4.1 ลบรายการที่ถูกเอาออก
                if (diff.toDelete && diff.toDelete.length > 0) {
                    for (const line of diff.toDelete) {
                        await this.updateIssueStockLineRepository.delete(tx, line.issue_stock_line_id);
                        // หากจำเป็นต้องคืนจำนวนสต็อก สามารถเรียก InventoryOrchestrator แบบย้อนหลังที่นี่ได้
                    }
                }

                // 4.2 เพิ่มรายการใหม่
                for (const line of diff.toCreate) {
                    const lineData = CreateIssueStockLineMapper.toPrismaCreateInput(line as CreateIssueStockLineDto, issue_stock_id);
                    await this.createIssueStockLineRepository.create(tx, lineData);
                    
                    // Note: เพิ่มโค้ดสำหรับ InventoryOrchestratorService เหมือนตอนสร้าง (create) ที่นี่ได้ถ้าต้องจัดการสต็อก
                }

                // 4.3 อัปเดตรายการเดิม
                for (const line of diff.toUpdate) {
                    const lineData = UpdateIssueStockLineMapper.toPrismaUpdateInput(line as any);
                    await this.updateIssueStockLineRepository.update(tx, line.issue_stock_line_id, lineData);
                    // Note: ถ้ามีการเปลี่ยน QTY ต้องไปปรับลดยอดสต็อกส่วนต่างอีกที
                }

                // 5. ส่งผลลัพธ์กลับ
                return await tx.issue_stock_header.findUnique({
                    where: { issue_stock_id },
                    include: { issueStockLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to update Issue Stock: ${error.message}`);
                }
                throw error;
            }
        });
    }
}
