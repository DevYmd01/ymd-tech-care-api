import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { SearchPendingDto } from './dto/search.dto';

import { CreateReturnStockHeaderDto } from './dto/create-return-stock-header.dto';
import { CreateReturnStockLineDto } from './dto/create-return-stock-line.dto';
import { CreateReturnStockHeaderMapper } from './mapper/create-return-stock-header.mapper';
import { CreateReturnStockLineMapper } from './mapper/create-return-stock-line.mapper';
import { CreateReturnStockHeaderRepository } from './repository/create-return-stock-header.repository';
import { CreateReturnStockLineRepository } from './repository/create-return-stock-line.repository';

@Injectable()
export class ReturnStockService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createReturnStockHeaderRepository: CreateReturnStockHeaderRepository,
        private readonly createReturnStockLineRepository: CreateReturnStockLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
    ) {}

    async create(createReturnStockDto: CreateReturnStockHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. สร้างเลขที่เอกสาร (Document Number)
                const return_stock_no = await this.documentNumberService.generate({
                    module_code: 'RIS',
                    document_type_code: 'RIS',
                    branch_id: createReturnStockDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createReturnStockDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createReturnStockDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createReturnStockDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. สร้าง Header
                const headerData = CreateReturnStockHeaderMapper.toPrismaCreateInput(
                    createReturnStockDto,
                    return_stock_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createReturnStockHeaderRepository.create(tx, headerData);

                // 4. บันทึกรายการ Lines และอัปเดต Stock Movement
                for (const line of createReturnStockDto.lines) {
                    const lineData = CreateReturnStockLineMapper.toPrismaCreateInput(line, header.return_stock_id);
                    await this.createReturnStockLineRepository.create(tx, lineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'RIS',
                        doc_type_no: doc_type_no,
                        item_uom_id: line.uom_id,
                        ref_doc_no: return_stock_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty),
                    });
                }

                // 5. ส่งข้อมูลผลลัพธ์กลับไป
                return await tx.return_issue_stock_header.findUnique({
                    where: { return_stock_id: header.return_stock_id },
                    include: { returnIssueStockLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Return Stock: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findAll() {
        return this.prismaService.return_issue_stock_header.findMany({
            include: {
                returnIssueStockLines: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prismaService.return_issue_stock_header.findUnique({
            where: {
                return_stock_id: id,
            },
            include: {
                returnIssueStockLines: true,
            },
        });
    }

    async findPendingReturnStock(searchPendingDto: SearchPendingDto) {
        const page = searchPendingDto.page || 1;
        const limit = searchPendingDto.limit || 20;
        const skip = (page - 1) * limit;

        const whereCondition = {
            status: { in: ['CONFIRMED'] },
        };

        const [data, total] = await Promise.all([
            this.prismaService.issue_stock_header.findMany({
                where: whereCondition,
                skip: skip,
                take: limit,
                include: {
                    issueStockLines: true,
                },
                orderBy: { issue_stock_id: 'desc' }, // เรียงลำดับเพื่อให้ Pagination ทำงานได้ถูกต้อง
            }),
            this.prismaService.issue_stock_header.count({ where: whereCondition }),
        ]);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                total_pages: Math.ceil(total / limit),
            },
        };
    }

    async findPendingReturnStockBySoId(issue_stock_id: number) {
        return this.prismaService.issue_stock_header.findMany({
            where: { 
                issue_stock_id: issue_stock_id,
            },
            include: {
                issueStockLines: true,
            },
        });
    }

    async searchPending(searchPendingDto: SearchPendingDto) {

        const {
            page = 1,
            limit = 20,
            issue_stock_no,
            status,
            issue_stock_id,
        } = searchPendingDto;

        const safeLimit = Math.min(limit, 100);
        const skip = (page - 1) * safeLimit;
        
        const whereCondition: any = {
            status: status ? status : { in: ['CONFIRMED'] },
        };

        if (issue_stock_no) {
            whereCondition.issue_stock_no = {
                contains: issue_stock_no,
            };
        }

        if (issue_stock_id) {
            whereCondition.issue_stock_id = {
                equals: issue_stock_id,
            };
        }

        const [data, total] = await Promise.all([
            this.prismaService.issue_stock_header.findMany({
                where: whereCondition,
                skip: skip,
                take: safeLimit,
                include: {
                    issueStockLines: true,
                },
                orderBy: { issue_stock_id: 'desc' },
            }),
            this.prismaService.issue_stock_header.count({ where: whereCondition }),
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
}
