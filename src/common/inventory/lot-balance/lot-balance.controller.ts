// src/common/inventory/lot-balance/lot-balance.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LotBalanceService } from './lot-balance.service';

@Controller('lot-balance')
export class LotBalanceController {
  constructor(private readonly service: LotBalanceService) {}

  @Post('adjust')
  async adjust(@Body() data: any) {
    return this.service.adjust(data);
  }

  @Post('reserve')
  async reserve(@Body() data: any) {
    return this.service.reserve(data);
  }

  @Post('release')
  async release(@Body() data: any) {
    return this.service.release(data);
  }
}