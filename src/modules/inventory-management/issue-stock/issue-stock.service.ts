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

@Injectable()
export class IssueStockService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createIssueStockHeaderRepository: CreateIssueStockHeaderRepository,
        private readonly createIssueStockLineRepository: CreateIssueStockLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
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

}
