import { Module } from '@nestjs/common';
import { TaxCodeController } from './tax-code.controller';
import { TaxCodeService } from './tax-code.service';

@Module({
  controllers: [TaxCodeController],
  providers: [TaxCodeService]
})
export class TaxCodeModule {}
