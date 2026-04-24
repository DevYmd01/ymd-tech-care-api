import { Prisma } from '@prisma/client';
import { CreateItemLotDto } from '../dto/create-item-lot.dto';

export class CreateItemLotMapper {
  static toPrismaCreateInput(
    dto: CreateItemLotDto,
  ): Prisma.item_lotCreateInput {
    return {
      lot_no: dto.lot_no,

      item: {
        connect: {
          item_id: dto.item_id,
        },
      },

      supplier_vendor: dto.supplier_vendor_id
        ? {
            connect: {
              vendor_id: dto.supplier_vendor_id,
            },
          }
        : undefined,

      mfg_date: dto.mfg_date ? new Date(dto.mfg_date) : undefined,
      expiry_date: dto.expiry_date
        ? new Date(dto.expiry_date)
        : undefined,

      status: dto.status,
      note: dto.note,
    };
  }
}