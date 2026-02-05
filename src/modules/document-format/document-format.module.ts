import { Module } from '@nestjs/common';
import { DocumentFormatController } from './document-format.controller';
import { DocumentFormatService } from './document-format.service';

@Module({
  controllers: [DocumentFormatController],
  providers: [DocumentFormatService]
})
export class DocumentFormatModule { }
