import { Module } from '@nestjs/common';
import { InventoryEngineController } from './inventory-engine.controller';
import { InventoryEngineService } from './inventory-engine.service';
import { LotBalanceModule } from '../lot-balance/lot-balance.module';

@Module({
  controllers: [InventoryEngineController],
  providers: [InventoryEngineService],
  imports: [LotBalanceModule]
})
export class InventoryEngineModule {}
