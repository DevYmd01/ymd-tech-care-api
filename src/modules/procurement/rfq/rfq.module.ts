import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { CreateRFQHeaderRepository } from './repository/create-rfq-header.repository';
import { CreateRFQLineRepository } from './repository/create-rfq-line.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateRFQVendorRepository } from './repository/create-rfq-vendor.repository';
import { CreateRFQVendorMapper } from './mapper/create-rfq-vendor.mapper';
import { CreateRFQLineMapper } from './mapper/create-rfq-line.mapper';
import { RFQMapper } from './mapper/create-rfq-header.mapper';

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
    RFQMapper
  ]
})
export class RfqModule { }
