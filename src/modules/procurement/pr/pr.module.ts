import { Module } from '@nestjs/common';
import { PrController } from './pr.controller';
import { PrService } from './pr.service';
import { PRHeaderRepository } from './repositories/create-pr-header.repository';
import { DocumentNumberModule } from 'src/modules/document-number/document-number.module';
import { CreatePRLineRepository } from './repositories/create-pr-line.repository';
import { CreateAuditLogRepository } from './repositories/create-audit-log.repository';
import { PrTaxService } from './domain/pr-tax.service';
import { PrCalculationService } from './domain/pr-calculation.service';
import { UpdatePRHeaderRepository } from './repositories/update-pr-header.ropository';
import { UpdatePRLineRepository } from './repositories/update-pr-line-repository';

@Module({
    imports: [DocumentNumberModule],
    controllers: [PrController],
    providers: [
        PrService,
        PRHeaderRepository,
        CreatePRLineRepository,
        CreateAuditLogRepository,
        PrTaxService,
        PrCalculationService,
        UpdatePRHeaderRepository,
        UpdatePRLineRepository,
    ]
})
export class PrModule { }
