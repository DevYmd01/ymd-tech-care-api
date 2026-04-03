import { Module } from '@nestjs/common';
import { CustomerTypeController } from './customer-type.controller';
import { CustomerTypeService } from './customer-type.service';

@Module({
  controllers: [CustomerTypeController],
  providers: [CustomerTypeService]
})
export class CustomerTypeModule {}
