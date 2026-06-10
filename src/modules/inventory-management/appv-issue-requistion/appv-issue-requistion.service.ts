import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateAppvIssueReqHeaderRepository } from './repository/create-appv-issue-req-header.repository';
import { CreateAppvIssueReqLineRepository } from './repository/create-appv-issue-req-line.repository';
import { CreateAppvIssueReqHeaderMapper } from './mapper/create-appv-issue-req-header.mapper';
import { CreateAppvIssueReqLineMapper } from './mapper/create-appv-issue-req-line.mapper';

import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';

import { DocumentNumberService } from '@/modules/document-number/document-number.service';

import { diffById } from '@/common/utils';

import { CreateApprovedIssueRequisitionHeaderDto } from './dto/create-appv-issue-req-header.dto';
import { CreateApprovedIssueRequisitionLineDto } from './dto/create-appv-issue-req-line.dto';

@Injectable()
export class AppvIssueRequistionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createAppvIssueReqHeaderRepository: CreateAppvIssueReqHeaderRepository,
        private readonly createAppvIssueReqLineRepository: CreateAppvIssueReqLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
    ) {}

    async create(createApprovedIssueRequisitionHeaderDto: CreateApprovedIssueRequisitionHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const appv_issue_req_no = await this.documentNumberService.generate({
                    module_code: 'APPV_ISSUE',
                    document_type_code: 'APPV_ISSUE',
                    branch_id: createApprovedIssueRequisitionHeaderDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type_no จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createApprovedIssueRequisitionHeaderDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createApprovedIssueRequisitionHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createApprovedIssueRequisitionHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. แปลงข้อมูลและสร้าง Header
                const headerData = CreateAppvIssueReqHeaderMapper.toPrismaCreateInput(
                    createApprovedIssueRequisitionHeaderDto,
                    appv_issue_req_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createAppvIssueReqHeaderRepository.create(tx, headerData);

                // 4. อัปเดตสถานะของเอกสารใบเบิกต้นทาง (Issue Requisition) ตามสถานะการอนุมัติ (เช่น APPROVED หรือ REJECTED)
                await tx.issue_requistion_header.update({
                    where: { issue_req_id: createApprovedIssueRequisitionHeaderDto.issue_req_id },
                    data: { status: createApprovedIssueRequisitionHeaderDto.status },
                });

                // 5. จัดการข้อมูลรายการ (Lines)
                if (createApprovedIssueRequisitionHeaderDto.lines && createApprovedIssueRequisitionHeaderDto.lines.length > 0) {
                    for (const line of createApprovedIssueRequisitionHeaderDto.lines) {
                        // บันทึก Line ลงฐานข้อมูล
                        const lineData = CreateAppvIssueReqLineMapper.toPrismaCreateInput(line, header.appv_issue_req_id);
                        await this.createAppvIssueReqLineRepository.create(tx, lineData);

                        // 6. บันทึก Stock Movement เฉพาะในกรณีที่สถานะเป็น 'APPROVED' เท่านั้น
                        if (createApprovedIssueRequisitionHeaderDto.status === 'APPROVED') {
                            await this.inventoryOrchestratorService.process(tx, {
                                system_document_code: 'APPV_ISSUE',
                                doc_type_no: doc_type_no,
                                item_uom_id: line.uom_id,
                                ref_doc_no: appv_issue_req_no,
                                lot_id: Number(line.lot_id),
                                item_lot_balance_id: Number(line.lot_balance_id),
                                qty: Number(line.approved_qty),
                            });
                        }
                    }
                }

                // 7. ดึงข้อมูลที่สร้างเสร็จสมบูรณ์กลับมาแสดงผล
                return await tx.appvissue_requistion_header.findUnique({
                    where: { appv_issue_req_id: header.appv_issue_req_id },
                    include: { appvissueRequistionLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Approved Issue Requisition: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll() {
        return this.prismaService.appvissue_requistion_header.findMany({
            include: {
                appvissueRequistionLines: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prismaService.appvissue_requistion_header.findUnique({
            where: { appv_issue_req_id: id },
            include: {
                appvissueRequistionLines: true,
            },
        });
    }

    async findPendingApproval() {
        return this.prismaService.issue_requistion_header.findMany({
            where: { status: 'PENDING' },
            include: {
                issueRequistionLines: true,
            },
        });
    }

    async findPendingApprovalByIssueReqId(issue_req_id: number) {
        return this.prismaService.issue_requistion_header.findMany({
            where: { status: 'PENDING', issue_req_id },
            include: {
                issueRequistionLines: true,
            },
        });
    }
}
