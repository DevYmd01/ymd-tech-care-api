// src/common/inventory/lot-balance/lot-balance.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LotBalanceService } from './lot-balance.service';
import { CreateLotBalanceDto } from './dto/create-lot-balance.dto';

@Controller('lot-balance')
export class LotBalanceController {
  constructor(private readonly service: LotBalanceService) {}

}