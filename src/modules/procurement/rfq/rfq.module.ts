import { Module } from '@nestjs/common';
import { RfqController } from './rfq.controller';
import { RfqService } from './rfq.service';
import { DocumentNumberModule } from '@/modules/document-number/document-number.module';
import { CreateRFQHeaderRepository } from './repository/create-rfq-herder.repository';
import { CreateRFQLineRepository } from './repository/create-rfq-line.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [DocumentNumberModule],
  controllers: [RfqController],
  providers: [RfqService, CreateRFQHeaderRepository, CreateRFQLineRepository, PrismaService]
})
export class RfqModule { }
