import { Module } from '@nestjs/common';
import { PrController } from './pr.controller';
import { PrService } from './pr.service';
import { PRHeaderRepository } from './repositories/pr-header.repository';
import { DocumentNumberModule } from 'src/modules/document-number/document-number.module';

@Module({
    imports: [DocumentNumberModule],
    controllers: [PrController],
    providers: [PrService, PRHeaderRepository]
})
export class PrModule { }
