import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendorRepository } from './repositories/create-vendor.repository';
import { CreateAddressRepository } from './repositories/create-address.repository';
import { CreateContactRepository } from './repositories/create-contact.repository';
import { CreateBankRepository } from './repositories/create-bank.repository';

@Module({
  controllers: [VendorsController],
  providers: [
    VendorsService,
    PrismaService,
    CreateVendorRepository,
    CreateAddressRepository,
    CreateContactRepository,
    CreateBankRepository,
  ],
})
export class VendorsModule { }
