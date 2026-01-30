import { Module } from '@nestjs/common';
import { ItemClassController } from './item-class.controller';
import { ItemClassService } from './item-class.service';

@Module({
  controllers: [ItemClassController],
  providers: [ItemClassService]
})
export class ItemClassModule {}
