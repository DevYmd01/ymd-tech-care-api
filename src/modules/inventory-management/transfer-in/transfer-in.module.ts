import { Module } from '@nestjs/common';
import { TransferInController } from './transfer-in.controller';
import { TransferInService } from './transfer-in.service';

@Module({
  controllers: [TransferInController],
  providers: [TransferInService]
})
export class TransferInModule {}
