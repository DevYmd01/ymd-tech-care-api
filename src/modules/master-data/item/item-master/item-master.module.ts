import { Module } from '@nestjs/common';
import { ItemMasterController } from './item-master.controller';
import { ItemMasterService } from './item-master.service';
import { CreateItemMasterRepository } from './repository/create-item-master.repository';

@Module({
  controllers: [ItemMasterController],
  providers: [ItemMasterService, CreateItemMasterRepository]
})
export class ItemMasterModule { }
