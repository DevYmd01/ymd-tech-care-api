import { Module } from '@nestjs/common';
import { EmployeesSalePeriodController } from './employees-sale-period.controller';
import { EmployeesSalePeriodService } from './employees-sale-period.service';

@Module({
  controllers: [EmployeesSalePeriodController],
  providers: [EmployeesSalePeriodService]
})
export class EmployeesSalePeriodModule {}
