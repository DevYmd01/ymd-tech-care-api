import { Module } from '@nestjs/common';
import { ItemGradeController } from './item-grade.controller';
import { ItemGradeService } from './item-grade.service';

@Module({
  controllers: [ItemGradeController],
  providers: [ItemGradeService]
})
export class ItemGradeModule {}
