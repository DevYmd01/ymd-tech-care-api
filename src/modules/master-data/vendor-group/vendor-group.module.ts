import { Module } from '@nestjs/common';
import { VendorGroupController } from './vendor-group.controller';
import { VendorGroupService } from './vendor-group.service';

@Module({
  controllers: [VendorGroupController],
  providers: [VendorGroupService]
})
export class VendorGroupModule {}
