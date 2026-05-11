import { Module } from '@nestjs/common';
import { ItemUomController } from './item-uom.controller';
import { ItemUomService } from './item-uom.service';
import { ItemUomRepository } from './repository/item-uom.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { ItemUomMapper } from './mapper/item-uom.mapper';

@Module({
  controllers: [ItemUomController],
  providers: [
    ItemUomService,
    ItemUomRepository,
    PrismaService,
    ItemUomMapper
  ]
})
export class ItemUomModule {}
