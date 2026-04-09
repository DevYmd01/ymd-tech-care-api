import { Prisma } from "@prisma/client";
import { CreateMultiPriceItemDto } from "../dto/create-multi-price-item.dto";

export class CreateMultiPriceItemMapper {
  static toPrisma(dto: CreateMultiPriceItemDto): Prisma.multi_price_itemCreateInput {
    return {
      item_from_qty: dto.item_from_qty,
      item: { connect: { item_id: dto.item_id } },
      ...(dto.item_price1 !== undefined ? { item_price1: dto.item_price1 } : {}),
      ...(dto.item_price2 !== undefined ? { item_price2: dto.item_price2 } : {}),
      ...(dto.item_price3 !== undefined ? { item_price3: dto.item_price3 } : {}),
      ...(dto.item_price4 !== undefined ? { item_price4: dto.item_price4 } : {}),
      ...(dto.item_price5 !== undefined ? { item_price5: dto.item_price5 } : {}),
      ...(dto.item_price6 !== undefined ? { item_price6: dto.item_price6 } : {}),
      ...(dto.item_price7 !== undefined ? { item_price7: dto.item_price7 } : {}),
      ...(dto.item_price8 !== undefined ? { item_price8: dto.item_price8 } : {}),
      ...(dto.item_price9 !== undefined ? { item_price9: dto.item_price9 } : {}),
      ...(dto.item_price10 !== undefined ? { item_price10: dto.item_price10 } : {}),
      item_to_qty: dto.item_to_qty,
      ...(dto.uom_id ? { uom: { connect: { uom_id: dto.uom_id } } } : {}),
    };
  }
}