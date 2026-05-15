// src/common/inventory/lot-balance/lot-balance.module.ts
import { Module } from '@nestjs/common';
import { LotBalanceService } from './lot-balance.service';
import { LotBalanceController } from './lot-balance.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [],
  providers: [LotBalanceService, PrismaService],
  controllers: [LotBalanceController],
  exports: [LotBalanceService],
})
export class LotBalanceModule {}