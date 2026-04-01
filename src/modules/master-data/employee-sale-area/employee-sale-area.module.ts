import { Module } from '@nestjs/common';
import { EmployeeSaleAreaController } from './employee-sale-area.controller';
import { EmployeeSaleAreaService } from './employee-sale-area.service';

@Module({
  controllers: [EmployeeSaleAreaController],
  providers: [EmployeeSaleAreaService]
})
export class EmployeeSaleAreaModule {}
