import { Module } from '@nestjs/common';
import { ItemMasterController } from './item-master.controller';
import { ItemMasterService } from './item-master.service';
import { CreateItemMasterRepository } from './repository/create-item-master.repository';
import { UpdateItemMasterRepository } from './repository/update-item-master.repository';

@Module({
  controllers: [ItemMasterController],
  providers: [ItemMasterService, CreateItemMasterRepository, UpdateItemMasterRepository]
})
export class ItemMasterModule { }
