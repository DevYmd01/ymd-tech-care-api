import { Module } from '@nestjs/common';
import { EmpployeesSaleTargetController } from './empployees-sale-target.controller';
import { EmpployeesSaleTargetService } from './empployees-sale-target.service';

@Module({
  controllers: [EmpployeesSaleTargetController],
  providers: [EmpployeesSaleTargetService]
})
export class EmpployeesSaleTargetModule {}
