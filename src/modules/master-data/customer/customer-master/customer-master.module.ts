import { Module } from '@nestjs/common';
import { CustomerMasterController } from './customer-master.controller';
import { CustomerMasterService } from './customer-master.service';
import { CreateCustomerMasterRepository } from './repository/create-customer-master.repository';
import { CreateCustomerAddressRepository } from './repository/create-customer-address.repository';

@Module({
  controllers: [CustomerMasterController],
  providers: [
    CustomerMasterService,
    CreateCustomerMasterRepository,
    CreateCustomerAddressRepository,
  ],
})
export class CustomerMasterModule {}
