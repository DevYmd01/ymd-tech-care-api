import { Module } from '@nestjs/common';
import { PrController } from './pr.controller';
import { PrService } from './pr.service';
import { PRHeaderRepository } from './repositories/create-pr-header.repository';
import { DocumentNumberModule } from 'src/modules/document-number/document-number.module';
import { CreatePRLineRepository } from './repositories/create-pr-line.repository';
import { CreateAuditLogRepository } from './repositories/create-audit-log.repository';
@Module({
    imports: [DocumentNumberModule],
    controllers: [PrController],
    providers: [
        PrService,
        PRHeaderRepository,
        CreatePRLineRepository,
        CreateAuditLogRepository
    ]
})
export class PrModule { }
