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
import { UpdatePOHeaderMapper } from './mapper/update-po-header.mapper';
import { UpdatePOLineMapper } from './mapper/update-po-line.mapper';
import { UpdatePOHeaderRepository } from './repository/update-po-header.repository';
import { UpdatePOLineRepository } from './repository/update-po-line.repository';
import { PrModule } from '../pr/pr.module';
import { CreatePRFromPOHeaderMapper } from '../pr/mapper/create-pr-from-po.mapper';
import { PRHeaderRepository } from '../pr/repositories/create-pr-header.repository';

@Module({
  imports: [DocumentNumberModule, PrModule],
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
    UpdatePOHeaderMapper,
    UpdatePOLineMapper,
    UpdatePOHeaderRepository,
    UpdatePOLineRepository,
    CreatePRFromPOHeaderMapper,
    PRHeaderRepository,
  ]
})
export class PoModule {}
