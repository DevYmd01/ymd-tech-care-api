import { Module } from '@nestjs/common';
import { PricingEngineController } from './pricing-engine.controller';
import { PricingEngineService } from './pricing-engine.service';
import { CommonUomModule } from '../../../common/uom/uom.module';
@Module({
   imports: [CommonUomModule],
  controllers: [PricingEngineController],
  providers: [PricingEngineService]
})
export class PricingEngineModule {}
