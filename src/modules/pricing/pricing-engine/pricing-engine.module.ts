import { Module } from '@nestjs/common';
import { PricingEngineController } from './pricing-engine.controller';
import { PricingEngineService } from './pricing-engine.service';
import { UomModule } from '../../../common/uom/uom.module';
@Module({
   imports: [UomModule],
  controllers: [PricingEngineController],
  providers: [PricingEngineService]
})
export class PricingEngineModule {}
