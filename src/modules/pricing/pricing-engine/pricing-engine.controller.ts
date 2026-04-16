import { Controller, Get, Query } from '@nestjs/common';
import { PricingEngineService } from './pricing-engine.service';
import { CalculatePriceDto } from './dto/calculate-price.dto';

@Controller('pricing-engine')
export class PricingEngineController {
  constructor(
    private readonly pricingEngineService: PricingEngineService,
  ) {}

  @Get('calculate')
  calculate(@Query() query: CalculatePriceDto) {
    return this.pricingEngineService.calculate(query);
  }
}