import { Module } from '@nestjs/common';
import { IcOptionListController } from './ic-option-list.controller';
import { IcOptionListService } from './ic-option-list.service';

@Module({
  controllers: [IcOptionListController],
  providers: [IcOptionListService]
})
export class IcOptionListModule {}
