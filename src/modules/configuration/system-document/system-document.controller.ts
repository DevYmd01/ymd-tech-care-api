import { Controller, Post, Body, Get, Patch, Param, Request, Query, Res, ParseIntPipe } from '@nestjs/common';
import { SystemDocumentService } from './system-document.service';

@Controller('system-document')
export class SystemDocumentController {
    constructor(private readonly systemDocumentService: SystemDocumentService) { }

    @Get()
    async findAll() {
        return this.systemDocumentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.systemDocumentService.findOne(+id);
    }
}

