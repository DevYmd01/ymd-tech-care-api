import { Module } from '@nestjs/common';
import { ItemLotController } from './item-lot.controller';
import { ItemLotService } from './item-lot.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemLotRepository } from './repository/create-item-lot.repository';
import { CreateItemLotMapper } from './mapper/create-item-lot.mapper';
import { UpdateItemLotRepository } from './repository/update-item-lot.repository';
import { UpdateItemLotMapper } from './mapper/update-item-lot.mapper';
import { GetAvailableLotService } from '@/common/inventory/lot/service/get-available-lot.service';
import { AllocateLotService } from '@/common/inventory/lot/service/allocate-lot.service';
import { ReserveLotService } from '@/common/inventory/lot/service/reserve-lot.service';




@Module({
  controllers: [ItemLotController],
  providers: [
    ItemLotService,
    PrismaService,
    CreateItemLotRepository,
    CreateItemLotMapper,
    UpdateItemLotRepository,
    UpdateItemLotMapper,
    GetAvailableLotService,
    AllocateLotService,
    ReserveLotService
  ]
})
export class ItemLotModule {}
