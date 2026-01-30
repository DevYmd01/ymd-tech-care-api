import { Module } from '@nestjs/common';
import { ItemSizeController } from './item-size.controller';
import { ItemSizeService } from './item-size.service';

@Module({
  controllers: [ItemSizeController],
  providers: [ItemSizeService]
})
export class ItemSizeModule {}
