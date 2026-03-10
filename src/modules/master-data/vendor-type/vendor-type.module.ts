import { Module } from '@nestjs/common';
import { VendorTypeController } from './vendor-type.controller';
import { VendorTypeService } from './vendor-type.service';

@Module({
  controllers: [VendorTypeController],
  providers: [VendorTypeService]
})
export class VendorTypeModule {}
