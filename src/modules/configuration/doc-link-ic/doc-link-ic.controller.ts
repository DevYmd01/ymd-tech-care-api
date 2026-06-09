// src/common/inventory/doc-link-ic/doc-link-ic.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { DocLinkIcService } from './doc-link-ic.service';

import { DocLinkIcDto } from './dto/doc-link-ic.dto';

@Controller('doc-link-ic')
export class DocLinkIcController {
  constructor(
    private readonly docLinkIcService: DocLinkIcService,
  ) {}

  // ======================================================
  // CREATE
  // ======================================================
  @Post()
  async create(
    @Body() dto: DocLinkIcDto,
  ) {
    return this.docLinkIcService.create(dto);
  }

  // ======================================================
  // FIND ALL
  // ======================================================
  @Get()
  async findAll() {
    return this.docLinkIcService.findAll();
  }

  // ======================================================
  // FIND ACTIVE
  // ======================================================
  @Get('active')
  async findActive() {
    return this.docLinkIcService.findActive();
  }

  // ======================================================
  // FIND BY SYSTEM DOCUMENT
  // ======================================================
  @Get('system-document/:system_document_id')
  async findBySystemDocument(
    @Param(
      'system_document_id',
      ParseIntPipe,
    )
    system_document_id: number,
  ) {
    return this.docLinkIcService.findBySystemDocument(
      system_document_id,
    );
  }


  

  // ======================================================
  // FIND ONE
  // ======================================================
  @Get(':doc_link_ic_id')
  async findOne(
    @Param(
      'doc_link_ic_id',
      ParseIntPipe,
    )
    doc_link_ic_id: number,
  ) {
    return this.docLinkIcService.findOne(
      doc_link_ic_id,
    );
  }

  

  // ======================================================
  // UPDATE
  // ======================================================
  @Patch(':doc_link_ic_id')
  async update(
    @Param(
      'doc_link_ic_id',
      ParseIntPipe,
    )
    doc_link_ic_id: number,

    @Body()
    dto: Partial<DocLinkIcDto>,
  ) {
    return this.docLinkIcService.update(
      doc_link_ic_id,
      dto,
    );
  }

  // ======================================================
  // DELETE
  // ======================================================
  @Delete(':doc_link_ic_id')
  async delete(
    @Param(
      'doc_link_ic_id',
      ParseIntPipe,
    )
    doc_link_ic_id: number,
  ) {
    return this.docLinkIcService.delete(
      doc_link_ic_id,
    );
  }

  @Get('get-doc-link-ic/:system_document_code/:doc_type_no')
  async getDocLinkIC(
    @Param('system_document_code')
    system_document_code: string,
    @Param('doc_type_no', ParseIntPipe)
    doc_type_no: number,
  ) {
    return this.docLinkIcService.getDocLinkIC(
      system_document_code,
      doc_type_no,
    );
  }

}