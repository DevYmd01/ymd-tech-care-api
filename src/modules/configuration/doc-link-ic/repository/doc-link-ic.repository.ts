// src/common/inventory/doc-link-ic/repository/doc-link-ic.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

import { Prisma, doc_link_ic } from '@prisma/client';

@Injectable()
export class DocLinkIcRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================================
  // CREATE
  // ======================================================
  async create(
    data: Prisma.doc_link_icCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<doc_link_ic> {
    const client = tx ?? this.prisma;

    return client.doc_link_ic.create({
      data,
    });
  }

  // ======================================================
  // UPDATE
  // ======================================================
  async update(
    doc_link_ic_id: number,
    data: Prisma.doc_link_icUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<doc_link_ic> {
    const client = tx ?? this.prisma;

    return client.doc_link_ic.update({
      where: {
        doc_link_ic_id,
      },
      data,
    });
  }

  // ======================================================
  // DELETE
  // ======================================================
  async delete(
    doc_link_ic_id: number,
    tx?: Prisma.TransactionClient,
  ): Promise<doc_link_ic> {
    const client = tx ?? this.prisma;

    return client.doc_link_ic.delete({
      where: {
        doc_link_ic_id,
      },
    });
  }

  // ======================================================
  // FIND ALL
  // ======================================================
  async findAll(): Promise<doc_link_ic[]> {
    return this.prisma.doc_link_ic.findMany({
      orderBy: {
        doc_link_ic_id: 'desc',
      },
    });
  }

  // ======================================================
  // FIND ONE
  // ======================================================
  async findOne(
    doc_link_ic_id: number,
  ): Promise<doc_link_ic | null> {
    return this.prisma.doc_link_ic.findUnique({
      where: {
        doc_link_ic_id,
      },
    });
  }

  // ======================================================
  // FIND ACTIVE
  // ======================================================
  async findActive(): Promise<doc_link_ic[]> {
    return this.prisma.doc_link_ic.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        doc_link_ic_id: 'desc',
      },
    });
  }

  // ======================================================
  // FIND BY SYSTEM DOCUMENT
  // ======================================================
  async findBySystemDocument(
    system_document_id: number,
  ): Promise<doc_link_ic[]> {
    return this.prisma.doc_link_ic.findMany({
      where: {
        system_document_id,
      },
      orderBy: {
        doc_link_ic_id: 'desc',
      },
    });
  }
}