import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateICOptionDto } from '../dto/create-ic-option-list.dto';

@Injectable()
export class CreateICOptionListMapper {
  toPersistence(
    dto: CreateICOptionDto,
  ): Prisma.ic_option_listCreateInput {
    return {
      ic_option: {
        connect: {
          ic_option_id: dto.ic_option_id,
        },
      },

      system_document: {
        connect: {
          system_document_id:
            dto.system_document_id,
        },
      },

      sort_order: dto.sort_order ?? 0,

      negative_stock_check:
        dto.negative_stock_check ?? 0,

      negative_stock_mode:
        dto.negative_stock_mode ?? 0,

      quantity_validation_flag:
        dto.quantity_validation_flag ?? 0,
    };
  }
}