import { Prisma } from '@prisma/client';
import { UpdateItemLotDto } from '../dto/update-item-lot.dto';

export class UpdateItemLotMapper {
  static toPrismaUpdateInput(
    dto: UpdateItemLotDto,
  ): Prisma.item_lotUpdateInput {
    return {
      lot_no: dto.lot_no,

      item: dto.item_id
        ? {
            connect: {
              item_id: dto.item_id,
            },
          }
        : undefined,

      supplier_vendor: dto.supplier_vendor_id
        ? {
            connect: {
              vendor_id: dto.supplier_vendor_id,
            },
          }
        : undefined,

      mfg_date: dto.mfg_date
        ? new Date(dto.mfg_date)
        : undefined,

      expiry_date: dto.expiry_date
        ? new Date(dto.expiry_date)
        : undefined,

      status: dto.status,

      note: dto.note,
    };
  }
}