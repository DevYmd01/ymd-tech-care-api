import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { CreateRFQHeaderRepository } from './repository/rfq-header.repository';
import { CreateRFQLineRepository } from './repository/rfq-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRFQVendorRepository } from './repository/rfq-vendor.repository';
import { CreateRFQVendorMapper } from './mapper/create-rfq-vendor.mapper';
import { CreateRFQLineMapper } from './mapper/create-rfq-line.mapper';
import { RFQMapper } from './mapper/create-rfq-header.mapper';
import { UpdateRFQLineMapper } from './mapper/update-rfq-line.mapper';
import { UpdateRFQVendorMapper } from './mapper/update-rfq-vendor-mapper';
import { UpdateRFQHeaderMapper } from './mapper/update-rfq-header.mapper';
import { AuditService } from '@/modules/audit/audit.service';
import { PdfService } from '@/modules/pdf/pdf.service';
import { MailService } from '@/modules/mail/mail.service';


@Module({
  imports: [DocumentNumberModule],
  controllers: [RfqController],
  providers: [
    RfqService,
    CreateRFQHeaderRepository,
    CreateRFQLineRepository,
    PrismaService,
    CreateRFQVendorRepository,
    CreateRFQVendorMapper,
    CreateRFQLineMapper,
    RFQMapper,
    UpdateRFQLineMapper,
    UpdateRFQVendorMapper,
    UpdateRFQHeaderMapper,
    AuditService,
    PdfService,
    MailService
  ]
})
export class RfqModule { }
