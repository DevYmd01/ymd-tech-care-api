import { Module } from '@nestjs/common';
import { ApiLogCleanupService } from './api-log-cleanup.service';

@Module({
  providers: [ApiLogCleanupService]
})
export class ApiLogCleanupModule {}

