import { Module } from '@nestjs/common';
import { InventoryOptionController } from './inventory-option.controller';
import { InventoryOptionService } from './inventory-option.service';

@Module({
  controllers: [InventoryOptionController],
  providers: [InventoryOptionService]
})
export class InventoryOptionModule {}
