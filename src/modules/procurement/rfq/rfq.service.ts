import { Injectable } from '@nestjs/common';
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';
import { CreateRFQHeaderRepository } from './repository/rfq-header.repository';
import { CreateRFQLineRepository } from './repository/rfq-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { RFQMapper } from './mapper/create-rfq-header.mapper';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateRFQLineMapper } from './mapper/create-rfq-line.mapper';
import { CreateRFQVendorMapper } from './mapper/create-rfq-vendor.mapper';
import { CreateRFQVendorRepository } from './repository/rfq-vendor.repository';
import { UpdateRFQHeaderDTO } from './dto/update-rfq-header.dto';
import { UpdateRFQHeaderMapper } from './mapper/update-rfq-header.mapper';
import { UpdateRFQLineMapper } from './mapper/update-rfq-line.mapper';
import { UpdateRFQVendorMapper } from './mapper/update-rfq-vendor-mapper';
import { diffById } from '@/common/utils';

@Injectable()
export class RfqService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly createRFQHeaderRepository: CreateRFQHeaderRepository,
        private readonly createRFQLineRepository: CreateRFQLineRepository,
        private readonly createRFQVendorRepository: CreateRFQVendorRepository
    ) { }

    async createRFQ(rfqHeader: CreateRFQHeaderDTO) {
        try {
            const documentNo =
                await this.documentNumberService.generate({
                    module_code: 'RFQ',
                    document_type_code: 'RFQ',
                    branch_id: rfqHeader.branch_id ?? 0,
                });

            const rfqHeaderData =
                RFQMapper.toPrismaCreateInput(rfqHeader, documentNo);

            return this.prisma.$transaction(async (tx) => {

                // ⭐ create header
                const createdHeader =
                    await this.createRFQHeaderRepository.create(tx, rfqHeaderData);

                // ⭐ map lines
                const rfqLineData =
                    CreateRFQLineMapper.toPrismaCreateInput(
                        rfqHeader.rfqLines ?? [],
                        createdHeader.rfq_id
                    );

                // ⭐ create many
                if (rfqLineData.length > 0) {
                    await this.createRFQLineRepository.createMany(tx, rfqLineData);
                }

                // ⭐ map vendors
                const rfqVendorData =
                    CreateRFQVendorMapper.toPrismaCreateInput(
                        rfqHeader.rfqVendors ?? [],
                        createdHeader.rfq_id
                    );

                // ⭐ create many
                if (rfqVendorData.length > 0) {
                    await this.createRFQVendorRepository.createMany(tx, rfqVendorData);
                }

                return { createdHeader, rfqLineData, rfqVendorData };

            });
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        return this.prisma.rfq_header.findMany({
            include: {
                rfqLines: true,
            },
        });
    }


    async updateRFQ(dto: UpdateRFQHeaderDTO, rfq_id: number) {

        return this.prisma.$transaction(async (tx) => {

            // ⭐ update header
            const headerData =
                UpdateRFQHeaderMapper.toPrismaUpdateInput(dto, rfq_id);

            const updatedHeader =
                await this.createRFQHeaderRepository.update(tx, rfq_id, headerData);

            // ⭐ guard status
            if (updatedHeader.status === 'APPROVED') {
                throw new Error('Cannot update approved RFQ');
            }

            // =========================
            // ===== LINES SECTION =====
            // =========================

            const existingLines = await tx.rfq_line.findMany({
                where: { rfq_id }
            });

            const incomingLines = dto.rfqLines ?? [];

            // ⭐ diff lines
            const lineDiff = diffById(
                existingLines,
                incomingLines,
                'rfq_line_id'
            );

            const createLineData =
                CreateRFQLineMapper.toPrismaCreateInput(
                    lineDiff.toCreate,
                    rfq_id
                );


            const updateLineData =
                UpdateRFQLineMapper.toPrismaUpdateInput(
                    lineDiff.toUpdate,
                    rfq_id
                );

            // ⭐ create new
            if (createLineData.length > 0) {
                await this.createRFQLineRepository.createMany(tx, createLineData);
            }

            // ⭐ update existing
            if (updateLineData.length > 0) {
                await this.createRFQLineRepository.updateMany(tx, updateLineData);
            }

            // ⭐ delete removed
            if (lineDiff.toDelete.length > 0) {
                await tx.rfq_line.deleteMany({
                    where: {
                        rfq_line_id: {
                            in: lineDiff.toDelete.map(l => l.rfq_line_id)
                        }
                    }
                });
            }

            // =========================
            // ==== VENDOR SECTION =====
            // =========================

            const existingVendors = await tx.rfq_vendor.findMany({
                where: { rfq_id }
            });

            const incomingVendors = dto.rfqVendors ?? [];

            const vendorDiff = diffById(
                existingVendors,
                incomingVendors,
                'rfq_vendor_id'
            );

            const createVendorData =
                CreateRFQVendorMapper.toPrismaCreateInput(
                    vendorDiff.toCreate,
                    rfq_id
                );

            const updateVendorData =
                UpdateRFQVendorMapper.toPrismaUpdateInput(
                    vendorDiff.toUpdate,
                    rfq_id
                );

            if (createVendorData.length > 0) {
                await this.createRFQVendorRepository.createMany(tx, createVendorData);
            }

            if (updateVendorData.length > 0) {
                await this.createRFQVendorRepository.updateMany(tx, updateVendorData);
            }

            if (vendorDiff.toDelete.length > 0) {
                await tx.rfq_vendor.deleteMany({
                    where: {
                        rfq_vendor_id: {
                            in: vendorDiff.toDelete.map(v => v.rfq_vendor_id)
                        }
                    }
                });
            }

            return updatedHeader;
        });
    }

}



