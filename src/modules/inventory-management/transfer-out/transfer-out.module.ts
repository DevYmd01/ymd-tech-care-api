import { Module } from '@nestjs/common';
import { TransferOutController } from './transfer-out.controller';
import { TransferOutService } from './transfer-out.service';

@Module({
  controllers: [TransferOutController],
  providers: [TransferOutService]
})
export class TransferOutModule {}
