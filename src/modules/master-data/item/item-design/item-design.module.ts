import { Module } from '@nestjs/common';
import { ItemDesignController } from './item-design.controller';
import { ItemDesignService } from './item-design.service';

@Module({
  controllers: [ItemDesignController],
  providers: [ItemDesignService]
})
export class ItemDesignModule {}
