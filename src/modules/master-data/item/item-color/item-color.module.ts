import { Module } from '@nestjs/common';
import { ItemColorService } from './item-color.service';
import { ItemColorController } from './item-color.controller';

@Module({
  providers: [ItemColorService],
  controllers: [ItemColorController]
})
export class ItemColorModule {}
