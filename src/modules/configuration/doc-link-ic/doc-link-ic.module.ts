import { Module } from '@nestjs/common';
import { DocLinkIcController } from './doc-link-ic.controller';
import { DocLinkIcService } from './doc-link-ic.service';
import { PrismaService } from '@/prisma/prisma.service';
import { DocLinkIcMapper } from './mapper/doc-link-ic.mapper';
import { DocLinkIcRepository } from './repository/doc-link-ic.repository';

@Module({
  controllers: [DocLinkIcController],
  providers: [
    DocLinkIcService,
    DocLinkIcRepository,
    PrismaService,
    DocLinkIcMapper
  ]
})
export class DocLinkIcModule {}
