// d:/project01/ymd-tech-care-api/src/common/inventory/stock-options/stock-options.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IcOptionResolverService } from './service/ic-option-resolver.service';
import { StockValidationService } from './service/stock-validation.service';
import { LotAllocationService } from './service/lot-allocation.service';


@Module({
  providers: [PrismaService, IcOptionResolverService, StockValidationService, LotAllocationService],
  exports: [IcOptionResolverService, StockValidationService, LotAllocationService],
})
export class StockOptionsModule {}
