import { Injectable } from '@nestjs/common';
import { CreateRFQHeaderDTO } from './dto/create-rfq-header.dto';
import { CreateRFQHeaderRepository } from './repository/create-rfq-herder.repository';
import { CreateRFQLineRepository } from './repository/create-rfq-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { RFQMapper } from './mapper/create-rfq-header.mapper';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';
import { CreateRFQLineMapper } from './mapper/create-rfq-line.mapper';

@Injectable()
export class RfqService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly documentNumberService: DocumentNumberService,
        private readonly createRFQHeaderRepository: CreateRFQHeaderRepository,
        private readonly createRFQLineRepository: CreateRFQLineRepository
    ) { }

    async createRFQ(rfqHeader: CreateRFQHeaderDTO) {

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

            return createdHeader;

        });
    }
}



