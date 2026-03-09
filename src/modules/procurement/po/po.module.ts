import { Module } from '@nestjs/common';
import { PoController } from './po.controller';
import { PoService } from './po.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { AuditService } from '@/modules/audit/audit.service';
import { CreatePOHeaderRepository } from './repository/create-po-header.repository';
import { CreatePOLineRepository } from './repository/create-po-line.repository';
import { CreatePOHeaderMapper } from './mapper/create-po-header.mapper';
import { POLineMapper } from './mapper/create-po-line.mapper';
import { TaxService } from './domain/po-tax.domain.service';
import { VqCalculationDomainService } from './domain/po-calculation.domain.service';
import { AuditLogRepository } from './repository/audit-log.repository';



@Module({
  imports: [DocumentNumberModule],
  controllers: [PoController],
  providers: [
    PoService,
    PrismaService,
    AuditService,
    CreatePOHeaderRepository,
    CreatePOLineRepository,
    CreatePOHeaderMapper,
    POLineMapper,
    TaxService,
    VqCalculationDomainService,
    AuditLogRepository,
  ]
})
export class PoModule {}
