import { Injectable } from '@nestjs/common';
import { CreatePOHeaderDTO } from './dto/create-po-header.dto';
import { CreatePOLineDTO } from './dto/create-po-line.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePOHeaderRepository } from './repository/create-po-header.repository';
import { CreatePOLineRepository } from './repository/create-po-line.repository';
import { CreatePOHeaderMapper } from './mapper/create-po-header.mapper';
import { POLineMapper } from './mapper/create-po-line.mapper';
import { AuditService } from '@/modules/audit/audit.service';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { TaxService } from './domain/po-tax.domain.service';
import { VqCalculationDomainService } from './domain/po-calculation.domain.service';
import { Decimal } from '@prisma/client/runtime/library';
import { AuditLogRepository } from './repository/audit-log.repository';
import { UpdatePOHeaderDTO } from './dto/update-po-header.dto';
import { UpdatePOLineDTO } from './dto/update-po-line.dto';
import { UpdatePOHeaderMapper } from './mapper/update-po-header.mapper';
import { UpdatePOLineMapper } from './mapper/update-po-line.mapper';
import { UpdatePOHeaderRepository } from './repository/update-po-header.repository';
import { UpdatePOLineRepository } from './repository/update-po-line.repository';
import { diffById } from '@/common/utils';
import { CreatePRFromPOHeaderMapper as PrCreatePOHeaderMapper } from '../pr/mapper/create-pr-from-po.mapper';
import { PRHeaderRepository } from '../pr/repositories/create-pr-header.repository';

@Injectable()
export class PoService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly DocumentNumberService: DocumentNumberService,
        private readonly auditService: AuditService,
        private readonly createPOHeaderRepository: CreatePOHeaderRepository,
        private readonly createPOLineRepository: CreatePOLineRepository,
        private readonly taxService: TaxService,
        private readonly vqCalculationDomainService: VqCalculationDomainService,
        private readonly auditLogRepository: AuditLogRepository,
        private readonly updatePOHeaderRepository: UpdatePOHeaderRepository,
        private readonly updatePOLineRepository: UpdatePOLineRepository,
        private readonly PRHeaderRepository: PRHeaderRepository,

    ) { }

    async createPOHeader(createPOHeaderDTO: CreatePOHeaderDTO, context: any) {

        console.log('createPOHeaderDTO', createPOHeaderDTO);
        return this.prismaService.$transaction(async (tx) => {

            // สร้าง PO document number
            const documentNo = await this.DocumentNumberService.generate({
                module_code: 'PO',
                document_type_code: 'PO',
                branch_id: 0,
            });

            const taxConfig = await this.taxService.getTaxById(
                createPOHeaderDTO.tax_code_id!
            );

            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);
            let subtotal = new Decimal(0);

            const calculatedLines: any[] = [];

            // คำนวณ line
            for (const line of createPOHeaderDTO.po_lines) {

                const lineAmount =
                    this.vqCalculationDomainService.calculateLine({
                        qty: line.qty,
                        unit_price: line.unit_price,
                        discount_expression: line.discount_expression
                            ? String(line.discount_expression)
                            : undefined,
                    });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            // คำนวณ header
            const headerDocTotals =
                this.vqCalculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: createPOHeaderDTO.exchange_rate,
                    discount_expression: String(createPOHeaderDTO.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

            /**
             * สร้าง PO Header
             * รองรับการสร้าง PO โดยตรง ไม่จำเป็นต้องผ่าน PR, RFQ, AV, QC (FK เป็น Optional)
             */
            const createPOHeaderData =
                CreatePOHeaderMapper.toPrismaCreateInput(
                    createPOHeaderDTO,
                    documentNo,
                    headerDocTotals
                );

            const createdHeader =
                await this.createPOHeaderRepository.create(
                    tx,
                    createPOHeaderData
                );

            /**
             * สร้าง PO Lines
             */
            for (const { line, calc } of calculatedLines) {

                const createPOLineData =
                    POLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        createdHeader.po_header_id
                    );

                await this.createPOLineRepository.create(
                    tx,
                    createPOLineData
                );

            }

            /**
             * Audit Log
             */
            await this.auditLogRepository.create(
                tx,
                createdHeader,
                context
            );

            return tx.po_header.findUnique({
                where: { po_header_id: createdHeader.po_header_id },
                include: {
                    poLines: true,
                },
            });

        });

    }


    async updatePO(
        id: number,
        updatePOHeaderDto: UpdatePOHeaderDTO,
        context: any,
    ) {
        return this.prismaService.$transaction(async (tx) => {

            // 1️⃣ หา header เดิม
            const existingHeader = await tx.po_header.findUnique({
                where: { po_header_id: id },
                include: { poLines: true },
            });

            if (!existingHeader) {
                throw new Error('PO not found');
            }

            // 2️⃣ tax config
            const taxConfig = await this.taxService.getTaxById(updatePOHeaderDto.tax_code_id!);
            const taxRate = new Decimal(taxConfig.tax_rate).div(100);

            let subtotal = new Decimal(0);
            let discountAmount = new Decimal(0);
            let netAmount = new Decimal(0);

            const calculatedLines: {
                line: UpdatePOLineDTO;
                calc: any;
            }[] = [];

            // 3️⃣ คำนวณ line ใหม่ทั้งหมด
            for (const line of updatePOHeaderDto.po_lines) {
                const lineAmount = this.vqCalculationDomainService.calculateLine({
                    qty: line.qty,
                    unit_price: line.unit_price,
                    discount_expression: line.discount_expression
                        ? String(line.discount_expression)
                        : undefined,
                });

                subtotal = subtotal.plus(lineAmount.subtotal);
                discountAmount = discountAmount.plus(lineAmount.discountAmount);
                netAmount = netAmount.plus(lineAmount.netAmount);

                calculatedLines.push({
                    line,
                    calc: lineAmount,
                });
            }

            // 4️⃣ คำนวณ header total ใหม่
            const headerTotals =
                this.vqCalculationDomainService.calculateHeaderTotal({
                    subtotal: netAmount.toNumber(),
                    exchange_rate: updatePOHeaderDto.exchange_rate,
                    discount_expression: String(updatePOHeaderDto.discount_expression),
                    tax_rate: taxRate.toNumber(),
                });

            // 5️⃣ update header
            const updateHeaderData =
                UpdatePOHeaderMapper.toPrismaUpdateInput(updatePOHeaderDto, headerTotals);

            const updatedHeader =
                await this.updatePOHeaderRepository.update(
                    tx,
                    id,
                    updateHeaderData,
                );

            // 6️⃣ diff lines
            const diff = diffById(
                existingHeader.poLines,
                updatePOHeaderDto.po_lines,
                'po_line_id',
            );

            // 7️⃣ delete
            for (const line of diff.toDelete) {
                await tx.po_line.delete({
                    where: { po_line_id: line.po_line_id },
                });
            }

            // 8️⃣ update
            for (const line of diff.toUpdate) {
                const calc = calculatedLines.find(
                    (l) => l.line.po_line_id === line.po_line_id,
                )?.calc;

                const updateLineData =
                    UpdatePOLineMapper.toPrismaUpdateInput(line, calc, updatedHeader.po_header_id);

                if (!line.po_line_id) {
                    throw new Error('po_line_id is required for update');
                }

                await this.updatePOLineRepository.update(
                    tx,
                    line.po_line_id,
                    updateLineData,
                );
            }

            // 9️⃣ create
            for (const line of diff.toCreate) {
                const calc = calculatedLines.find(
                    (l) => !l.line.po_line_id && l.line === line,
                )?.calc;

                const createLineData =
                    POLineMapper.toPrismaCreateInput(
                        line,
                        calc,
                        updatedHeader.po_header_id,
                    );

                await this.createPOLineRepository.create(
                    tx,
                    createLineData,
                );
            }

            // 🔟 audit
            await this.auditLogRepository.update(tx, updatedHeader, context);

            return tx.po_header.findUnique({
                where: { po_header_id: id },
                include: {
                    poLines: true,
                },
            });
        });
    }

    findAll() {
        return this.prismaService.po_header.findMany({

        });
    }

    findOne(id: number) {
        return this.prismaService.po_header.findUnique({
            where: { po_header_id: id },
            include: {
                poLines: true,
            },
        });
    }

    // findPRWithoutQC() {
    //     return this.prismaService.pr_header.findMany({
    //         where: {
    //             poHeaders: {
    //                 none: {},
    //             },
    //             qcHeaders: {
    //                 some: {},
    //             },
    //             status: 'APPROVED',
    //         },
    //         include: {
    //             poHeaders: true,
    //             qcHeaders: true,
    //         }
    //     });
    // }

    
    // findPRWithoutQC() {
    //     return this.prismaService.qc_header.findMany({
    //         include: {
    //             pr: {
    //                 select: {
    //                     pr_id: true,
    //                     pr_no: true
    //                 }
    //             },
    //             rfq: {
    //                 select: {
    //                     rfq_id: true,
    //                     rfq_no: true,
    //                     pr_approval: {
    //                         select: {
    //                             approval_id: true,
    //                             approval_no: true,
    //                             approval_date: true,
    //                             status: true,
    //                             remarks: true
    //                         },
    //                     },
    //                     _count: {
    //                         select: {
    //                             vqHeaders: true,
    //                         }
    //                     }
                        
    //                 }
    //             },
    //             winningVq: {
    //                 select: {
    //                     vq_header_id: true,
    //                     vq_no: true,
    //                     base_total_amount: true,
    //                     vendor: {
    //                         select: {
    //                             vendor_id: true,
    //                             vendor_name: true,
    //                         }
    //                     }
    //                 }
    //             }
    //     }
    //     });
    // }

    async findPRWithoutQC() {
  const data = await this.prismaService.qc_header.findMany({
    include: {
      pr: {
        select: {
          pr_id: true,
          pr_no: true
        }
      },
      rfq: {
        select: {
          rfq_id: true,
          rfq_no: true,
          pr_approval: {
            select: {
              approval_no: true,
              status: true
            }
          },
          _count: {
            select: {
              vqHeaders: true,
            }
          }
        }
      },
      winningVq: {
        select: {
          vq_no: true,
          base_total_amount: true,
          vendor: {
            select: {
              vendor_name: true,
            }
          }
        }
      }
    }
  });

  // 💥 flatten
  return data.map(qc => ({
    qc_id: qc.qc_id,
    qc_no: qc.qc_no,
    qc_status: qc.status,

    pr_id: qc.pr?.pr_id,
    pr_no: qc.pr?.pr_no,

    rfq_id: qc.rfq?.rfq_id,
    rfq_no: qc.rfq?.rfq_no,

    approval_no: qc.rfq?.pr_approval?.approval_no ?? null,
    approval_status: qc.rfq?.pr_approval?.status ?? null,

    vendor_name: qc.winningVq?.vendor?.vendor_name ?? null,
    vq_no: qc.winningVq?.vq_no ?? null,
    total_amount: qc.winningVq?.base_total_amount ?? null,

    vq_count: qc.rfq?._count?.vqHeaders ?? 0,
  }));
}

findQCWithoutPO(qc_id: number) {
  return this.prismaService.qc_header.findUnique({
    where: {
      qc_id: qc_id
    },
    include: {
      pr: {
        select: {
          pr_id: true,
          pr_no: true
        }
      },
      rfq: {
        include: {
          pr_approval: {
            select: {
              approval_id: true,
              approval_no: true,
              approval_date: true,
              status: true,
              remarks: true
            }
          },
          rfqLines: {   // 💥 เพิ่มตรงนี้
            include: {
              item: true,
              uom: true,
              // ใส่ field ที่คุณต้องใช้ใน input
            }
          },
        //   _count: {
        //     select: {
        //       vqHeaders: true,
        //     }
        //   }
        }
      },
    //   winningVq: {
    //     include: {
    //       vendor: true,
    //       vqLines: {   // 💥 แนะนำเพิ่ม (ใช้ตอนเลือก vendor)
    //         include: {
    //           item: true
    //         }
    //       }
    //     }
    //   }
    }
  });
}

}
