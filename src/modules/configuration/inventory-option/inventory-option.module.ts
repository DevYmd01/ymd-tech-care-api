import { Module } from '@nestjs/common';
import { InventoryOptionController } from './inventory-option.controller';
import { InventoryOptionService } from './inventory-option.service';
import { CreateInventoryOptionMapper } from './mapper/create-inventory-option.mapper';
import { CreateInventoryOptionRepository } from './repository/create-inventory-option.repository';
import { UpdateInventoryOptionRepository } from './repository/update-inventory-option.repository';

@Module({
  controllers: [InventoryOptionController],
  providers: [
    InventoryOptionService,
    CreateInventoryOptionRepository,
    UpdateInventoryOptionRepository
  ]
})
export class InventoryOptionModule {}
