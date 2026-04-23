import { Module } from '@nestjs/common';
import { IcOptionListController } from './ic-option-list.controller';
import { IcOptionListService } from './ic-option-list.service';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateICOptionListRepository } from './repository/create-ic-option-list.repository';
import { UpdateICOptionListRepository } from './repository/update-ic-option-list.repository';
import { CreateICOptionListMapper } from './mapper/create-ic-option-list.mapper';
import { UpdateICOptionListMapper } from './mapper/update-ic-option-list.mapper';

@Module({
  controllers: [IcOptionListController],
  providers: 
  [
    IcOptionListService,
    IcOptionListService,
    PrismaService,
    CreateICOptionListRepository,
    UpdateICOptionListRepository,
    CreateICOptionListMapper,
    UpdateICOptionListMapper
  ]
})
export class IcOptionListModule {}
