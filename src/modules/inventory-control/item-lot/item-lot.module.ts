import { Module } from '@nestjs/common';
import { ItemLotController } from './item-lot.controller';
import { ItemLotService } from './item-lot.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemLotRepository } from './repository/create-item-lot.repository';
import { CreateItemLotMapper } from './mapper/create-item-lot.mapper';
import { UpdateItemLotRepository } from './repository/update-item-lot.repository';
import { UpdateItemLotMapper } from './mapper/update-item-lot.mapper';



@Module({
  controllers: [ItemLotController],
  providers: [
    ItemLotService,
    PrismaService,
    CreateItemLotRepository,
    CreateItemLotMapper,
    UpdateItemLotRepository,
    UpdateItemLotMapper
  ]
})
export class ItemLotModule {}
