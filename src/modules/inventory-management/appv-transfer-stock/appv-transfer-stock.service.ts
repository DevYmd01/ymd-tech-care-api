import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { InventoryOrchestratorService } from '@/common/inventory/lot-balance/commit/Inventory-orchestrator.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { diffById } from '@/common/utils';

import { CreateAppvTransferHeaderDto } from './dto/create-appv-transfer-header.dto';
import { CreateAppvTransferLineDto } from './dto/create-appv-transfer-line.dto';
import { CreateAppvTransferHeaderMapper } from './mapper/create-appv-transfer-header.mapper';
import { CreateAppvTransferLineMapper } from './mapper/create-appv-transfer-line.mapper';
import { CreateAppvTransferHeaderRepository } from './repository/create-appv-transfer-header.repository';
import { CreateAppvTransferLineRepository } from './repository/create-appv-transfer-line.repository';

import { UpdateAppvTransferHeaderDto } from './dto/update-appv-transfer-header.dto';
import { UpdateAppvTransferLineDto } from './dto/update-appv-transfer-line.dto';
import { UpdateAppvTransferHeaderMapper } from './mapper/update-appv-transfer-header.mapper';
import { UpdateAppvTransferLineMapper } from './mapper/update-appv-transfer-line.mapper';
import { UpdateAppvTransferHeaderRepository } from './repository/update-appv-transfer-header.repository';
import { UpdateAppvTransferLineRepository } from './repository/update-appv-transfer-line.repository';

import { SearchTransferDto } from './dto/search.dto';


@Injectable()
export class AppvTransferStockService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly createAppvTransferHeaderRepository: CreateAppvTransferHeaderRepository,
        private readonly createAppvTransferLineRepository: CreateAppvTransferLineRepository,
        private readonly documentNumberService: DocumentNumberService,
        private readonly inventoryOrchestratorService: InventoryOrchestratorService,
        private readonly updateAppvTransferHeaderRepository: UpdateAppvTransferHeaderRepository,
        private readonly updateAppvTransferLineRepository: UpdateAppvTransferLineRepository
    ) { }

    async create(createAppvTransferHeaderDto: CreateAppvTransferHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {

                const isCancelled = createAppvTransferHeaderDto.status === 'REJECTED';

                // 1. สร้างเลขที่เอกสาร (Document Number)
                const appv_transfer_no = await this.documentNumberService.generate({
                    module_code: 'APPV_TR',
                    document_type_code: 'APPV_TR',
                    branch_id: createAppvTransferHeaderDto.branch_id || 0,
                });

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic
                let stock_effect_ic: number | null = null;
                let doc_type_no = 0;
                let doc_type_name = '';

                if (createAppvTransferHeaderDto.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: createAppvTransferHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${createAppvTransferHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. สร้าง Header
                const headerData = CreateAppvTransferHeaderMapper.toPrismaCreateInput(
                    createAppvTransferHeaderDto,
                    appv_transfer_no,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name,
                );
                const header = await this.createAppvTransferHeaderRepository.create(tx, headerData);

                // 4. บันทึกรายการ Lines และอัปเดต Stock Movement // 4️⃣ Create Lines + Update PR Line
                for (const line of createAppvTransferHeaderDto.lines) {

                    const trLine = await tx.transfer_requisition_line.findUnique({
                        where: {
                            transfer_req_line_id: line.transfer_req_line_id,
                        },
                    });

                    if (!trLine) {
                        throw new BadRequestException(`Transfer Requisition Line with ID ${line.transfer_req_line_id} not found`);
                    }

                    const trQTY = Number(trLine.qty)

                    const existingApproved = await tx.appv_transfer_line.aggregate({
                        where: {
                            transfer_req_line_id: line.transfer_req_line_id,
                        },
                        _sum: {
                            qty_approved: true,
                        },
                    });

                    const currentApproved =
                        existingApproved._sum.qty_approved?.toNumber() ?? 0;

                    const incomingQty =
                        typeof line.qty_approved === 'number'
                            ? line.qty_approved
                            : Number(line.qty_approved ?? 0);

                    let newTotal = currentApproved;

                    // ✅ ถ้าไม่ใช่ cancel → ค่อยเพิ่ม qty
                    if (!isCancelled) {
                        newTotal = currentApproved + incomingQty;
                    }
                    const lineData = CreateAppvTransferLineMapper.toPrismaCreateInput(line, header.appv_transfer_id);
                    await this.createAppvTransferLineRepository.create(tx, lineData);

                    await this.inventoryOrchestratorService.process(tx, {
                        system_document_code: 'APPV_TR',
                        doc_type_no: doc_type_no,
                        item_uom_id: line.uom_id,
                        ref_doc_no: appv_transfer_no,
                        lot_id: Number(line.lot_id),
                        item_lot_balance_id: Number(line.lot_balance_id),
                        qty: Number(line.qty_approved),
                    });


                    // ✅ คำนวณ status
                    let status: 'PENDING' | 'PARTIAL' | 'APPROVED' | 'REJECTED';

                    if (isCancelled) {
                        if (newTotal === 0) {
                            status = 'REJECTED';
                        } else if (newTotal < trQTY) {
                            status = 'PARTIAL';
                        } else {
                            status = 'APPROVED';
                        }
                    } else {
                        if (newTotal === 0) {
                            status = 'PENDING';
                        } else if (newTotal < trQTY) {
                            status = 'PARTIAL';
                        } else {
                            status = 'APPROVED';
                        }
                    }

                    await tx.transfer_requisition_line.update({
                        where: { transfer_req_line_id: line.transfer_req_line_id },
                        data: {
                            status: status,
                            approved_qty: newTotal
                        },
                    });

                }

                // 5️⃣ Update PR Header status
                const trLineUpdated = await tx.transfer_requisition_line.findMany({
                    where: {
                        transfer_req_id: createAppvTransferHeaderDto.transfer_req_id,
                    },
                });

                        const totalRequested = trLineUpdated.reduce(
            (sum, l) => sum + Number(l.qty),
            0
        );

        const totalApproved = trLineUpdated.reduce(
            (sum, l) => sum + Number(l.approved_qty),
            0
        );

        let headerStatus: 'PENDING' | 'PARTIAL' | 'APPROVED' | 'REJECTED';

                if (isCancelled) {
            if (totalApproved === 0) {
                headerStatus = 'REJECTED';
            } else if (totalApproved < totalRequested) {
                headerStatus = 'PARTIAL';
            } else {
                headerStatus = 'APPROVED';
            }
        } else {
            if (totalApproved === 0) headerStatus = 'PENDING';
            else if (totalApproved < totalRequested) headerStatus = 'PARTIAL';
            else headerStatus = 'APPROVED';
        }

                await tx.transfer_requisition_header.update({
                    where: { transfer_req_id: createAppvTransferHeaderDto.transfer_req_id },
                    data: { status: headerStatus },
                });

                // 5. ส่งข้อมูลผลลัพธ์กลับไป
                return await tx.appv_transfer_header.findUnique({
                    where: { appv_transfer_id: header.appv_transfer_id },
                    include: { appvTransferLines: true },
                });

            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to create Appv Transfer Stock: ${error.message}`);
                }
                throw error;
            }
        });
    }


    async findAll(searchTransferDto: SearchTransferDto) {
        const {
            page = 1,
            limit = 20,
            appv_transfer_no,
            transfer_req_no,
            status,
            transfer_req_id,
            date_from,
            date_to,
        } = searchTransferDto;

        const safeLimit = Math.min(limit, 100);
        const skip = (page - 1) * safeLimit;

        const whereCondition: any = {};

        if (status) {
            whereCondition.status = status;
        }

        if (appv_transfer_no) {
            whereCondition.appv_transfer_no = { contains: appv_transfer_no };
        }

        if (transfer_req_id) {
            whereCondition.transfer_req_id = transfer_req_id;
        }

        if (transfer_req_no) {
            whereCondition.transfer_req_header = {
                transfer_req_no: { contains: transfer_req_no },
            };
        }

        if (date_from || date_to) {
            whereCondition.appv_transfer_date = {};
            if (date_from) {
                whereCondition.appv_transfer_date.gte = date_from;
            }
            if (date_to) {
                whereCondition.appv_transfer_date.lte = date_to;
            }
        }

        const [data, total] = await Promise.all([
            this.prismaService.appv_transfer_header.findMany({
                where: whereCondition,
                skip: skip,
                take: safeLimit,
                include: {
                    appvTransferLines: true,
                },
                orderBy: { appv_transfer_id: 'desc' },
            }),
            this.prismaService.appv_transfer_header.count({ where: whereCondition }),
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
        return this.prismaService.appv_transfer_header.findUnique({
            where: {
                appv_transfer_id: id,
            },
            include: {
                appvTransferLines: true,
            },
        });
    }

    async update(appv_transfer_id: number, updateAppvTransferHeaderDto: UpdateAppvTransferHeaderDto) {
        return this.prismaService.$transaction(async (tx) => {
            try {
                // 1. ค้นหาเอกสารเดิม
                const existingHeader = await tx.appv_transfer_header.findUnique({
                    where: { appv_transfer_id },
                    include: { appvTransferLines: true },
                });

                if (!existingHeader) {
                    throw new BadRequestException(`Appv Transfer Stock with ID ${appv_transfer_id} not found`);
                }

                // 2. ดึงค่า stock_effect_ic และ doc_type จาก doc_link_ic (ถ้ามีการเปลี่ยน)
                let stock_effect_ic: number | null = existingHeader.stock_effect_ic;
                let doc_type_no = existingHeader.doc_type_no;
                let doc_type_name = existingHeader.doc_type_name;

                if (updateAppvTransferHeaderDto.doc_link_ic_id && updateAppvTransferHeaderDto.doc_link_ic_id !== existingHeader.doc_link_ic_id) {
                    const docLinkIc = await tx.doc_link_ic.findUnique({
                        where: { doc_link_ic_id: updateAppvTransferHeaderDto.doc_link_ic_id },
                    });

                    if (!docLinkIc) {
                        throw new BadRequestException(`doc_link_ic with ID ${updateAppvTransferHeaderDto.doc_link_ic_id} not found`);
                    }
                    stock_effect_ic = docLinkIc.stock_effect_ic;
                    doc_type_no = Number(docLinkIc.doc_type_no || 0);
                    doc_type_name = docLinkIc.doc_type_name || '';
                }

                // 3. อัปเดต Header
                const headerData = UpdateAppvTransferHeaderMapper.toPrismaUpdateInput(
                    updateAppvTransferHeaderDto,
                    stock_effect_ic,
                    doc_type_no,
                    doc_type_name
                );

                await this.updateAppvTransferHeaderRepository.update(tx, appv_transfer_id, headerData);

                // 4. จัดการ Lines (เปรียบเทียบข้อมูลใหม่กับข้อมูลเดิม)
                const existingLines = existingHeader.appvTransferLines || [];
                const diff = diffById(
                    existingLines,
                    updateAppvTransferHeaderDto.lines as any || [],
                    "appv_transfer_line_id",
                );

                // 4.1 ลบรายการที่ถูกเอาออก
                if (diff.toDelete && diff.toDelete.length > 0) {
                    for (const line of diff.toDelete) {
                        await this.updateAppvTransferLineRepository.delete(tx, line.appv_transfer_line_id);
                    }
                }

                // 4.2 เพิ่มรายการใหม่
                for (const line of diff.toCreate) {
                    const lineData = CreateAppvTransferLineMapper.toPrismaCreateInput(line as CreateAppvTransferLineDto, appv_transfer_id);
                    await this.createAppvTransferLineRepository.create(tx, lineData);
                }

                // 4.3 อัปเดตรายการเดิม
                for (const line of diff.toUpdate) {
                    const lineData = UpdateAppvTransferLineMapper.toPrismaUpdateInput(line as any);
                    await this.updateAppvTransferLineRepository.update(tx, line.appv_transfer_line_id, lineData);
                }

                // 5. ส่งผลลัพธ์กลับ
                return await tx.appv_transfer_header.findUnique({
                    where: { appv_transfer_id },
                    include: { appvTransferLines: true },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new InternalServerErrorException(`Failed to update Appv Transfer Stock: ${error.message}`);
                }
                throw error;
            }
        });
    }

    async findPendingApproval() {
        return this.prismaService.transfer_requisition_header.findMany({
            where: {
                status: {
                    in: ['PENDING', 'PARTIAL']
                },
            },
            include: {
                transferRequisitionLines: true,
            },
        });
    }

}
