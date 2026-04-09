import { Module } from '@nestjs/common';
import { EmployeeSideController } from './employee-side.controller';
import { EmployeeSideService } from './employee-side.service';

@Module({
  controllers: [EmployeeSideController],
  providers: [EmployeeSideService]
})
export class EmployeeSideModule {}
