import { Module } from '@nestjs/common';
import { ItemPatternController } from './item-pattern.controller';
import { ItemPatternService } from './item-pattern.service';

@Module({
  controllers: [ItemPatternController],
  providers: [ItemPatternService]
})
export class ItemPatternModule {}
