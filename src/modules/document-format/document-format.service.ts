import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDocumentFormatDto } from './dto/update-document-format.dto';

@Injectable()
export class DocumentFormatService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        const data = await this.prisma.document_format.findMany();
        console.log('findAll data =>', data);
        return data;
    }

    async findOne(module_code: string, document_type_code: string) {
        const data = await this.prisma.document_format.findUnique({
            where: {
                module_code_document_type_code: {
                    module_code: module_code.toUpperCase().trim(),
                    document_type_code: document_type_code.toUpperCase().trim(),
                }
            }
        });

        if (!data) {
            throw new NotFoundException('Document format not found');
        }

        return data;
    }


    async update(module_code: string, document_type_code: string, updateDocumentFormatDto: UpdateDocumentFormatDto) {
        return this.prisma.document_format.update({
            where: { module_code_document_type_code: { module_code, document_type_code } },
            data: {
                prefix: updateDocumentFormatDto.prefix,
                pattern: updateDocumentFormatDto.pattern,
                seq_length: updateDocumentFormatDto.seq_length,
                running_cycle: updateDocumentFormatDto.running_cycle,
            }
        });
    }
}
