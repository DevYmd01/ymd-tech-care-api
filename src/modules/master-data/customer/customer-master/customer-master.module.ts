import { Module } from '@nestjs/common';
import { CustomerMasterController } from './customer-master.controller';
import { CustomerMasterService } from './customer-master.service';
import { CreateCustomerMasterRepository } from './repository/create-customer-master.repository';
import { CreateCustomerAddressRepository } from './repository/create-customer-address.repository';
import { UpdateCustomerAddressRepository } from './repository/update-customer-address.repository';
import { UpdateCustomerMasterRepository } from './repository/update-customer-master.repository';
import { DeleteCustomerAddressRepository } from './repository/delete-customer-address.repository';

@Module({
  controllers: [CustomerMasterController],
  providers: [
    CustomerMasterService,
    CreateCustomerMasterRepository,
    CreateCustomerAddressRepository,
    UpdateCustomerAddressRepository,
    UpdateCustomerMasterRepository,
    DeleteCustomerAddressRepository,
  ],
})
export class CustomerMasterModule {}
