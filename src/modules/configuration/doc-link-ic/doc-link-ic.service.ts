// src/common/inventory/doc-link-ic/doc-link-ic.service.ts

import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { DocLinkIcRepository } from './repository/doc-link-ic.repository';
import { DocLinkIcMapper } from './mapper/doc-link-ic.mapper';

import { DocLinkIcDto } from './dto/doc-link-ic.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DocLinkIcService {
  constructor(
    private readonly docLinkIcRepository: DocLinkIcRepository,
    private readonly prisma: PrismaService,
  ) { }

  // ======================================================
  // CREATE
  // ======================================================
  async create(
    dto: DocLinkIcDto,
    tx?: Prisma.TransactionClient,
  ) {
    try {
      const payload =
        DocLinkIcMapper.toCreate(dto);

      const result =
        await this.docLinkIcRepository.create(
          payload,
          tx,
        );

      return DocLinkIcMapper.toResponse(result);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const field = (error.meta?.target as string[])?.join(', ');

        throw new BadRequestException(
          `ข้อมูลซ้ำในฟิลด์: ${field}`,
        );
      }
    }
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
  //   async findAll() {
  //     const result =
  //       await this.docLinkIcRepository.findAll();

  //     return result.map((item) =>
  //       DocLinkIcMapper.toResponse(item),
  //     );
  //   }

  async findAll() {
    return this.prisma.doc_link_ic.findMany({
      include: {
        system_document: true,
      },
    });
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

  async getDocLinkIC( system_document_code: string, doc_type_no: number) {

    if(!doc_type_no){
      doc_type_no= 0
    }
  const result =
    await this.prisma.doc_link_ic.findFirst({
      where: {
        system_document: {
          system_document_code,
        },
        doc_type_no,
      },
      include: {
        system_document: true,
      },
    });

    const response = {
      doc_link_ic_id: result?.doc_link_ic_id,
      doc_type_no: result?.doc_type_no,
      system_document_id: result?.system_document_id,
      system_document_code: result?.system_document?.system_document_code,
      document_type: result?.system_document,
      document_name: result?.system_document?.system_document_name,
    };

    return response;
  }
}