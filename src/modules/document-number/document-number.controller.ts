import { Controller, Post } from '@nestjs/common';
import { DocumentNumberService } from './document-number.service';
import { Body } from '@nestjs/common';
import { GenerateDocNumberDto } from './dto/generate-doc-number.dto';

@Controller('document-number')
export class DocumentNumberController {
    constructor(private readonly documentNumberService: DocumentNumberService) { }

    @Post()
    async generate(@Body() params: GenerateDocNumberDto) {
        return this.documentNumberService.generate(params);
    }
}
