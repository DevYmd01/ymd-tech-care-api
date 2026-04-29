import { Module } from '@nestjs/common';
import { ItemLotBalanceController } from './item-lot-balance.controller';
import { ItemLotBalanceService } from './item-lot-balance.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemLotBalanceRepository } from './repository/create-item-lot-balance.repository';
import { CreateItemLotBalanceMapper } from './mapper/create-item-lot-balance.mapper';
import { UpdateItemLotBalanceRepository } from './repository/update-item-lot-balance.repository';
import { UpdateItemLotBalanceMapper } from './mapper/update-item-lot-balance.mapper';


@Module({
  controllers: [ItemLotBalanceController],
  providers: [
    ItemLotBalanceService,
    PrismaService,
    CreateItemLotBalanceRepository,
    CreateItemLotBalanceMapper,
    UpdateItemLotBalanceRepository,
    UpdateItemLotBalanceMapper
  ]
})
export class ItemLotBalanceModule {}
