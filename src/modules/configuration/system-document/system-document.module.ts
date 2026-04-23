import { Module } from '@nestjs/common';
import { SystemDocumentController } from './system-document.controller';
import { SystemDocumentService } from './system-document.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [SystemDocumentController],
  providers: [SystemDocumentService, PrismaService],
  exports: [SystemDocumentService]
})
export class SystemDocumentModule {}
