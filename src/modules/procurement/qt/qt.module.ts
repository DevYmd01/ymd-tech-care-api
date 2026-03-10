import { Module } from '@nestjs/common';
import { QtController } from './qt.controller';
import { QtService } from './qt.service';

@Module({
  controllers: [QtController],
  providers: [QtService]
})
export class QtModule {}
