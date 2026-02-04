import { Module } from '@nestjs/common';
import { DocumentNumberService } from './document-number.service';
import { DocumentNumberController } from './document-number.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [DocumentNumberService],
    exports: [DocumentNumberService],
    controllers: [DocumentNumberController],
})
export class DocumentNumberModule { }
