import { Module } from '@nestjs/common';
import { ItemMasterController } from './item-master.controller';
import { ItemMasterService } from './item-master.service';

import { UpdateItemMasterRepository } from './repository/update-item-master.repository';

import { ItemBarcodeModule } from '../item-barcode/item-barcode.module';

@Module({
  controllers: [ItemMasterController],
  providers: [ItemMasterService, UpdateItemMasterRepository],
   imports: [ItemBarcodeModule],
})
export class ItemMasterModule { }
