import { Module } from '@nestjs/common';
import { SaleQuotationController } from './sale-quotation.controller';
import { SaleQuotationService } from './sale-quotation.service';

@Module({
  controllers: [SaleQuotationController],
  providers: [SaleQuotationService]
})
export class SaleQuotationModule {}
