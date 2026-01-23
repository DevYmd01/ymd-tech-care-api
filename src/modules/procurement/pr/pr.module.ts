import { Module } from '@nestjs/common';
import { PrController } from './pr.controller';
import { PrService } from './pr.service';
import { PRHeaderRepository } from './repositories/pr-header.repository';

@Module({
    controllers: [PrController],
    providers: [PrService, PRHeaderRepository]
})
export class PrModule { }
