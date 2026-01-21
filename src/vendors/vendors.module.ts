import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { VendorRepository } from './repositories/vendor.repository';
import { VendorContactRepository } from './repositories/vendor-contact.repository';
import { VendorBankRepository } from './repositories/vendor-bank.repository';

@Module({
  controllers: [VendorsController],
  providers: [
    VendorsService,
    VendorRepository,
    VendorContactRepository,
    VendorBankRepository
  ],
  exports: [VendorsService]
})
export class VendorsModule { }



