import { Module } from '@nestjs/common';
import { ItemTypeController } from './item-type.controller';
import { ItemTypeService } from './item-type.service';

@Module({
  controllers: [ItemTypeController],
  providers: [ItemTypeService]
})
export class ItemTypeModule {}
