import { Module } from '@nestjs/common';
import { VqController } from './vq.controller';
import { VqService } from './vq.service';
import { CreateVQHeaderRepository } from './repository/create-vq-header.repository';
import { CreateVQLineRepository } from './repository/create-vq-line.repository';
import { DocumentNumberModule } from 'src/modules/document-number/document-number.module';
import { VqTaxService } from './domain/vq-tax.service';
import { VqCalculationDomainService } from './domain/vq-calculation.domain.service';
import { PrismaService } from '@/prisma/prisma.service';
import { AuditLogRepository } from './repository/audit-log.repository';
import { UpdateVQHeaderRepository } from './repository/update-vq-header.repository';
import { UpdateVQLineRepository } from './repository/update-vq-line.repository';

@Module({
  imports: [DocumentNumberModule],
  controllers: [VqController],
  providers: [
    VqService,
    CreateVQHeaderRepository,
    CreateVQLineRepository,
    VqTaxService,
    VqCalculationDomainService, 
    PrismaService,
    AuditLogRepository,
    UpdateVQHeaderRepository,
    UpdateVQLineRepository,
  ],
})
export class VqModule {}
