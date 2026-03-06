import { Module } from '@nestjs/common';
import { QcController } from './qc.controller';
import { QcService } from './qc.service';
import { CreateQcHeaderRepository } from './repository/create-qc-header.repository';
import { QCHeaderMapper } from './mapper/create-qc-header.mapper';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { DocumentNumberService } from '@/modules/document-number/document-number.service';

@Module({
  imports: [DocumentNumberModule],
  controllers: [QcController],
  providers: [
    QcService,
    CreateQcHeaderRepository,
    QCHeaderMapper,
    DocumentNumberService
  ]
})
export class QcModule { }
