import { Module } from '@nestjs/common';
import { BillGruopController } from './bill-gruop.controller';
import { BillGruopService } from './bill-gruop.service';

@Module({
  controllers: [BillGruopController],
  providers: [BillGruopService]
})
export class BillGruopModule {}
