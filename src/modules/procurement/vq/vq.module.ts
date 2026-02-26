import { Module } from '@nestjs/common';
import { VqController } from './vq.controller';
import { VqService } from './vq.service';

@Module({
  controllers: [VqController],
  providers: [VqService]
})
export class VqModule {}
