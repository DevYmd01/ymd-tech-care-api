import { Module } from '@nestjs/common';
import { PricingEngineController } from './pricing-engine.controller';
import { PricingEngineService } from './pricing-engine.service';
import { CommonUomModule } from '../../../common/uom/uom.module';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
   imports: [CommonUomModule],
  controllers: [PricingEngineController],
  providers: [PricingEngineService, PrismaService],
  exports: [PricingEngineService],
  
})
export class PricingEngineModule {}
