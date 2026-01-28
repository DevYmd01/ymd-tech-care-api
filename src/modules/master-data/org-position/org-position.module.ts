import { Module } from '@nestjs/common';
import { OrgPositionController } from './org-position.controller';
import { OrgPositionService } from './org-position.service';

@Module({
  controllers: [OrgPositionController],
  providers: [OrgPositionService]
})
export class OrgPositionModule {}
