import { Module } from '@nestjs/common';
import { VqController } from './vq.controller';
import { VqService } from './vq.service';
import { CreateVQHeaderRepository } from './repository/create-vq-header.repository';
import { CreateVQLineRepository } from './repository/creat-vq-line.repository';
import { DocumentNumberModule } from 'src/modules/document-number/document-number.module';
import { VqTaxService } from './domain/vq-tax.service';
import { VqCalculationDomainService } from './domain/vq-calculation.domain.service';

@Module({
  imports: [DocumentNumberModule],
  controllers: [VqController],
  providers: [
    VqService,
    CreateVQHeaderRepository,
    CreateVQLineRepository,
    VqTaxService,
    VqCalculationDomainService, 
  ],
})
export class VqModule {}
