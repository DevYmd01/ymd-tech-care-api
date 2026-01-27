import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVendorRepository } from './repositories/create-vendor.repository';
import { CreateAddressRepository } from './repositories/create-address.repository';

@Module({
  controllers: [VendorsController],
  providers: [
    VendorsService,
    PrismaService,
    CreateVendorRepository,
    CreateAddressRepository,
  ],
})
export class VendorsModule { }
