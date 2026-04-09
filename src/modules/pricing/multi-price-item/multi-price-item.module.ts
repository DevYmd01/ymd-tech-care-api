import { Module } from '@nestjs/common';
import { MultiPriceItemController } from './multi-price-item.controller';
import { MultiPriceItemService } from './multi-price-item.service';
import { MultiPriceItemRepository } from './repository/multi-price-item.repository';

@Module({
  controllers: [MultiPriceItemController],
  providers: [
    MultiPriceItemService, 
    MultiPriceItemRepository
  ],
})
export class MultiPriceItemModule {}
