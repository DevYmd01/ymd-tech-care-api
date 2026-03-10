import { Controller } from '@nestjs/common';
import { DocumentFormatService } from './document-format.service';
import { Body } from '@nestjs/common';
import { UpdateDocumentFormatDto } from './dto/update-document-format.dto';
import { Get, Param, Patch } from '@nestjs/common';

@Controller('document-format')
export class DocumentFormatController {
    constructor(private readonly documentFormatService: DocumentFormatService) { }

    @Get()
    async findAll() {
        return this.documentFormatService.findAll();
    }

    @Get(':module_code/:document_type_code')
    async findOne(@Param('module_code') module_code: string, @Param('document_type_code') document_type_code: string) {
        return this.documentFormatService.findOne(module_code, document_type_code);
    }

    @Patch(':module_code/:document_type_code')
    async update(@Param('module_code') module_code: string, @Param('document_type_code') document_type_code: string, @Body() updateDocumentFormatDto: UpdateDocumentFormatDto) {
        return this.documentFormatService.update(module_code, document_type_code, updateDocumentFormatDto);
    }
}
