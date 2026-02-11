import { Module } from '@nestjs/common';
import { TaxGroupController } from './tax-group.controller';
import { TaxGroupService } from './tax-group.service';

@Module({
  controllers: [TaxGroupController],
  providers: [TaxGroupService]
})
export class TaxGroupModule { }
