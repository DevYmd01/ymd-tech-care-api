// src/common/inventory/doc-link-ic/mapper/doc-link-ic.mapper.ts

import { Prisma } from '@prisma/client';

import { DocLinkIcDto } from '../dto/doc-link-ic.dto';

export class DocLinkIcMapper {
  // ======================================================
  // TO CREATE
  // ======================================================
  static toCreate(
    dto: DocLinkIcDto,
  ): Prisma.doc_link_icCreateInput {
    return {
      system_document: {
        connect: {
          system_document_id: dto.system_document_id,
        },
      },

      docu_desc: dto.docu_desc ?? null,

      remark: dto.remark ?? null,

      stock_effect_ic: dto.stock_effect_ic,
      doc_type_no: dto.doc_type_no,
      doc_type_name: dto.doc_type_name,
      is_active: dto.is_active ?? true,
    };
  }

  // ======================================================
  // TO UPDATE
  // ======================================================
  static toUpdate(
    dto: Partial<DocLinkIcDto>,
  ): Prisma.doc_link_icUpdateInput {
    return {
      ...(dto.system_document_id !== undefined && {
        system_document_id: dto.system_document_id,
      }),

      ...(dto.docu_desc !== undefined && {
        docu_desc: dto.docu_desc,
      }),

      ...(dto.remark !== undefined && {
        remark: dto.remark,
      }),

      ...(dto.stock_effect_ic !== undefined && {
        stock_effect_ic: dto.stock_effect_ic,
      }),

      ...(dto.is_active !== undefined && {
        is_active: dto.is_active,
      }),

      ...(dto.doc_type_no !== undefined && {
        doc_type_no: dto.doc_type_no,
      }),
      ...(dto.doc_type_name !== undefined && {
        doc_type_name: dto.doc_type_name,
      })
    };
  }

  // ======================================================
  // TO RESPONSE
  // ======================================================
  static toResponse(data: any) {
    return {
      doc_link_ic_id: data.doc_link_ic_id,

      system_document_id: data.system_document_id,

      system_document: data.system_document
        ? {
          docu_no: data.system_document.system_document_code,
          docu_name: data.system_document.system_document_name,
          docu_nameeng: data.system_document.system_document_name_eng,
        }
        : null,

      docu_desc: data.docu_desc,

      doc_type_no: data.doc_type_no,
      doc_type_name: data.doc_type_name,


      remark: data.remark,

      stock_effect_ic: data.stock_effect_ic,

      is_active: data.is_active,
    };
  }
}