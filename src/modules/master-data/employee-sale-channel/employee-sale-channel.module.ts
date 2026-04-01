import { Module } from '@nestjs/common';
import { EmployeeSaleChannelController } from './employee-sale-channel.controller';
import { EmployeeSaleChannelService } from './employee-sale-channel.service';

@Module({
  controllers: [EmployeeSaleChannelController],
  providers: [EmployeeSaleChannelService]
})
export class EmployeeSaleChannelModule {}
