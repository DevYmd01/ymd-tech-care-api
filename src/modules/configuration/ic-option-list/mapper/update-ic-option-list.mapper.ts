import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpDateICOptionDto } from '../dto/update-ic-option-list.dto';

@Injectable()
export class UpdateICOptionListMapper {
  toPersistence(
    dto: UpDateICOptionDto,
  ): Prisma.ic_option_listUpdateInput {
    const data: Prisma.ic_option_listUpdateInput =
      {};

    if (dto.ic_option_id !== undefined) {
      data.ic_option = {
        connect: {
          ic_option_id: dto.ic_option_id,
        },
      };
    }

    if (
      dto.system_document_id !== undefined
    ) {
      data.system_document = {
        connect: {
          system_document_id:
            dto.system_document_id,
        },
      };
    }

    if (dto.sort_order !== undefined) {
      data.sort_order = dto.sort_order;
    }

    if (
      dto.negative_stock_check !==
      undefined
    ) {
      data.negative_stock_check =
        dto.negative_stock_check;
    }

    if (
      dto.quantity_validation_flag !==
      undefined
    ) {
      data.quantity_validation_flag =
        dto.quantity_validation_flag;
    }

    if (
      dto.negative_stock_mode !==
      undefined
    ) {
      data.negative_stock_mode =
        dto.negative_stock_mode;
    }

    return data;
  }
}