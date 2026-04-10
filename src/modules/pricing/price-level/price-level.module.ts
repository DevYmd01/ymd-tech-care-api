import { Module } from '@nestjs/common';
import { PriceLevelController } from './price-level.controller';
import { PriceLevelService } from './price-level.service';

@Module({
  controllers: [PriceLevelController],
  providers: [PriceLevelService]
})
export class PriceLevelModule {}
