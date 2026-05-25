import { Module } from '@nestjs/common';
import { UomConversionService } from './item-uom/service/uom-conversion.service';

@Module({
  providers: [UomConversionService],
  exports: [UomConversionService],
})
export class UomModule {}