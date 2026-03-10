import { Module } from '@nestjs/common';
import { ItemBrandController } from './item-brand.controller';
import { ItemBrandService } from './item-brand.service';

@Module({
  controllers: [ItemBrandController],
  providers: [ItemBrandService]
})
export class ItemBrandModule {}
