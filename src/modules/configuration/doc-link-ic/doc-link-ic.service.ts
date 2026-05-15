// src/common/inventory/doc-link-ic/doc-link-ic.service.ts

import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { DocLinkIcRepository } from './repository/doc-link-ic.repository';
import { DocLinkIcMapper } from './mapper/doc-link-ic.mapper';

import { DocLinkIcDto } from './dto/doc-link-ic.dto';

@Injectable()
export class DocLinkIcService {
  constructor(
    private readonly docLinkIcRepository: DocLinkIcRepository,
  ) {}

  // ======================================================
  // CREATE
  // ======================================================
  async create(
    dto: DocLinkIcDto,
    tx?: Prisma.TransactionClient,
  ) {
    const payload =
      DocLinkIcMapper.toCreate(dto);

    const result =
      await this.docLinkIcRepository.create(
        payload,
        tx,
      );

    return DocLinkIcMapper.toResponse(result);
  }

  // ======================================================
  // UPDATE
  // ======================================================
  async update(
    doc_link_ic_id: number,
    dto: Partial<DocLinkIcDto>,
    tx?: Prisma.TransactionClient,
  ) {
    const existing =
      await this.docLinkIcRepository.findOne(
        doc_link_ic_id,
      );

    if (!existing) {
      throw new BadRequestException(
        'Document link not found',
      );
    }

    const payload =
      DocLinkIcMapper.toUpdate(dto);

    const result =
      await this.docLinkIcRepository.update(
        doc_link_ic_id,
        payload,
        tx,
      );

    return DocLinkIcMapper.toResponse(result);
  }

  // ======================================================
  // DELETE
  // ======================================================
  async delete(
    doc_link_ic_id: number,
    tx?: Prisma.TransactionClient,
  ) {
    const existing =
      await this.docLinkIcRepository.findOne(
        doc_link_ic_id,
      );

    if (!existing) {
      throw new BadRequestException(
        'Document link not found',
      );
    }

    return this.docLinkIcRepository.delete(
      doc_link_ic_id,
      tx,
    );
  }

  // ======================================================
  // FIND ALL
  // ======================================================
  async findAll() {
    const result =
      await this.docLinkIcRepository.findAll();

    return result.map((item) =>
      DocLinkIcMapper.toResponse(item),
    );
  }

  // ======================================================
  // FIND ONE
  // ======================================================
  async findOne(
    doc_link_ic_id: number,
  ) {
    const result =
      await this.docLinkIcRepository.findOne(
        doc_link_ic_id,
      );

    if (!result) {
      throw new BadRequestException(
        'Document link not found',
      );
    }

    return DocLinkIcMapper.toResponse(result);
  }

  // ======================================================
  // FIND ACTIVE
  // ======================================================
  async findActive() {
    const result =
      await this.docLinkIcRepository.findActive();

    return result.map((item) =>
      DocLinkIcMapper.toResponse(item),
    );
  }

  // ======================================================
  // FIND BY SYSTEM DOCUMENT
  // ======================================================
  async findBySystemDocument(
    system_document_id: number,
  ) {
    const result =
      await this.docLinkIcRepository.findBySystemDocument(
        system_document_id,
      );

    return result.map((item) =>
      DocLinkIcMapper.toResponse(item),
    );
  }
}