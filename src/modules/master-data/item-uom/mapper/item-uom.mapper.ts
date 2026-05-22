import { Prisma } from '@prisma/client';
import { CreateItemUomDto } from '../dto/item-uom.dto';

export class ItemUomMapper {

  static toCreate(dto: CreateItemUomDto): Prisma.item_uomCreateInput {
    return {
      factor: new Prisma.Decimal(dto.factor),
      is_purchase_uom: dto.is_purchase_uom ?? false,
      is_active: dto.is_active,

      item: {
        connect: {
          item_id: dto.item_id,
        },
      },

      fromUom: {
        connect: {
          uom_id: dto.from_uom_id,
        },
      },

      toUom: {
        connect: {
          uom_id: dto.to_uom_id,
        },
      },
    };
  }

  static toUpdate(dto: CreateItemUomDto): Prisma.item_uomUpdateInput {
    return {
      factor: dto.factor
        ? new Prisma.Decimal(dto.factor)
        : undefined,

      is_purchase_uom: dto.is_purchase_uom,
      is_active: dto.is_active,

      item: dto.item_id
        ? {
            connect: {
              item_id: dto.item_id,
            },
          }
        : undefined,

      fromUom: dto.from_uom_id
        ? {
            connect: {
              uom_id: dto.from_uom_id,
            },
          }
        : undefined,

      toUom: dto.to_uom_id
        ? {
            connect: {
              uom_id: dto.to_uom_id,
            },
          }
        : undefined,
    };
  }

  static toResponse(data: any) {
    return {
      item_uom_id: data.item_uom_id,

      factor: data.factor,
      is_purchase_uom: data.is_purchase_uom,
      is_active: data.is_active,

      item_id: data.item_id,
      from_uom_id: data.from_uom_id,
      to_uom_id: data.to_uom_id,

      item: data.item ?? null,
      from_uom: data.fromUom ?? null,
      to_uom: data.toUom ?? null,
      barcodes: data.itemBarcodes ?? null,
      customer: data.customer ?? null,


      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

static toResponseWithItem(data: any) {
    return {
      item_id: data.item_id,
      uom_id: data.from_uom_id,
      uom_name: data.fromUom?.uom_name,
      factor: data.factor,
    };
  }

}