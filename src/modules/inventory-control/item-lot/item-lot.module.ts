import { Module } from '@nestjs/common';
import { ItemLotController } from './item-lot.controller';
import { ItemLotService } from './item-lot.service';

@Module({
  controllers: [ItemLotController],
  providers: [ItemLotService]
})
export class ItemLotModule {}
